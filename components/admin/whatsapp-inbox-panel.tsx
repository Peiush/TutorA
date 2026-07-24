"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Tag } from "@/components/ui/tag";
import { Toast, ToastTone } from "@/components/ui/toast";
import { InboxEmptyIcon } from "@/components/dashboard/dashboard-icons";
import {
  listConversations,
  getConversationMessages,
  sendWhatsAppReply,
  type ConversationSummary,
  type ConversationMessage,
} from "@/app/lib/actions/whatsapp";

const POLL_MS = 8000;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function relativeDate(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function WhatsAppInboxPanel({ conversations: initial }: { conversations: ConversationSummary[] }) {
  const [conversations, setConversations] = useState(initial);
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      listConversations().then(setConversations);
      setNow(Date.now());
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    const load = () => {
      getConversationMessages(selectedId).then((msgs) => {
        if (!cancelled) setMessages(msgs);
      });
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [selectedId]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages]);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const lastInboundAt = [...messages].reverse().find((m) => m.direction === "IN")?.createdAt;
  const windowClosed = lastInboundAt ? now - lastInboundAt.getTime() > WINDOW_MS : messages.length > 0;

  function handleSend() {
    if (!selectedId || !draft.trim()) return;
    const body = draft.trim();
    setDraft("");
    startTransition(async () => {
      const result = await sendWhatsAppReply(selectedId, body);
      if (result.ok) {
        getConversationMessages(selectedId).then(setMessages);
        listConversations().then(setConversations);
      } else {
        setToast({ tone: "error", message: result.message ?? "Failed to send." });
        setDraft(body);
      }
    });
  }

  return (
    <div className="card elev-sm gap-4 p-[clamp(18px,3vw,26px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-[19px]">WhatsApp inbox</h2>
        {conversations.length > 0 && (
          <Tag variant="accent" className="text-[11px]">
            {conversations.length} conversation{conversations.length === 1 ? "" : "s"}
          </Tag>
        )}
      </div>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-3 py-9 px-4">
          <div
            className="w-12 h-12 rounded-full grid place-content-center"
            style={{ background: "var(--color-accent-2-100)", color: "var(--color-accent-2-700)" }}
          >
            <InboxEmptyIcon width={20} height={20} />
          </div>
          <p className="text-[14px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
            No conversations yet. Messages sent to your WhatsApp business number will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 [grid-template-columns:260px_1fr] min-h-[420px]" style={{ maxHeight: 560 }}>
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-1">
            {conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className="text-left p-2.5 cursor-pointer transition-colors duration-150"
                style={{
                  borderRadius: "var(--radius-md)",
                  background: c.id === selectedId ? "var(--color-surface)" : "transparent",
                  border: "1px solid " + (c.id === selectedId ? "var(--color-divider)" : "transparent"),
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13.5px] truncate" style={{ fontFamily: "var(--font-heading)" }}>
                    {c.studentName ?? c.phone}
                  </span>
                  <span className="text-[11px] flex-none" style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}>
                    {relativeDate(c.lastMessageAt)}
                  </span>
                </div>
                <div
                  className="text-[12px] mt-0.5 truncate"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                >
                  {c.lastMessageDirection === "OUT" ? "You: " : ""}
                  {c.lastMessageBody ?? "—"}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 min-w-0" style={{ borderLeft: "1px solid var(--color-divider)", paddingLeft: 14 }}>
            {!selected ? (
              <div className="flex-1 grid place-content-center text-[13.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}>
                Select a conversation
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[14.5px]" style={{ fontFamily: "var(--font-heading)" }}>
                      {selected.studentName ?? "Unknown student"}
                    </div>
                    <div className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                      {selected.phone}
                    </div>
                  </div>
                </div>

                <div ref={threadRef} className="flex-1 flex flex-col gap-2 overflow-y-auto py-1" style={{ minHeight: 280 }}>
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="max-w-[75%] px-3 py-2 text-[13px]"
                      style={{
                        alignSelf: m.direction === "OUT" ? "flex-end" : "flex-start",
                        borderRadius: "var(--radius-md)",
                        background: m.direction === "OUT" ? "var(--color-accent-100)" : "var(--color-surface)",
                      }}
                    >
                      <div>{m.body}</div>
                      <div
                        className="text-[10.5px] mt-1"
                        style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
                      >
                        {formatTime(m.createdAt)}
                        {m.direction === "OUT" ? ` · ${m.status.toLowerCase()}` : ""}
                      </div>
                    </div>
                  ))}
                </div>

                {windowClosed && (
                  <p className="text-[12px] m-0" style={{ color: "#d92d20" }}>
                    This conversation&rsquo;s 24-hour window has closed — the student needs to message you again
                    before you can send a freeform reply.
                  </p>
                )}

                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    placeholder="Type a reply…"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={pending || windowClosed}
                  />
                  <button
                    type="button"
                    className="btn btn-primary text-[12.5px]"
                    style={{ padding: "7px 14px" }}
                    disabled={pending || windowClosed || !draft.trim()}
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <Toast tone={toast.tone} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
