"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  COUNTRIES,
  type Country,
  findCountryByIso2,
  flagEmoji,
  formatPhoneValue,
  parsePhoneValue,
} from "@/lib/countries";
import { ChevronDownIcon, SearchIcon, CheckIcon } from "@/components/auth/auth-icons";

gsap.registerPlugin(useGSAP);

function detectDefaultIso2(): string {
  if (typeof navigator === "undefined") return "IN";
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of locales) {
    const region = locale?.split("-")[1];
    if (region && findCountryByIso2(region.toUpperCase())) return region.toUpperCase();
  }
  return "IN";
}

type PhoneInputProps = {
  id?: string;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  /** Uncontrolled initial combined value, e.g. "+91 9876543210". */
  defaultValue?: string;
  /** Controlled combined value; pass with onChange for parent-managed state. */
  value?: string;
  onChange?: (value: string) => void;
};

export function PhoneInput({
  id,
  name = "phone",
  required,
  autoFocus,
  disabled,
  autoComplete = "tel",
  className,
  defaultValue,
  value,
  onChange,
}: PhoneInputProps) {
  const isControlled = value !== undefined;
  const reactId = useId();
  const inputId = id ?? reactId;

  const initial = useMemo(() => parsePhoneValue(isControlled ? value : defaultValue), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [country, setCountry] = useState<Country>(initial.country);
  const [national, setNational] = useState(initial.national);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const [triggerWidth, setTriggerWidth] = useState(88);

  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  // Mirror an externally-controlled value (e.g. profile data arriving async).
  useEffect(() => {
    if (!isControlled || value === undefined) return;
    const parsed = parsePhoneValue(value);
    setCountry((prev) => (prev.iso2 === parsed.country.iso2 ? prev : parsed.country));
    setNational(parsed.national);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // No country was supplied at all — guess one from the browser locale.
  useEffect(() => {
    if (defaultValue || value) return;
    const detected = findCountryByIso2(detectDefaultIso2());
    if (detected) setCountry(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth);
  }, [country]);

  const combined = formatPhoneValue(country, national);

  function commit(nextCountry: Country, nextNational: string) {
    setCountry(nextCountry);
    setNational(nextNational);
    if (isControlled) onChange?.(formatPhoneValue(nextCountry, nextNational));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const digits = q.replace(/[^\d]/g, "");
    return COUNTRIES.filter((c) => {
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.iso2.toLowerCase() === q) return true;
      if (digits && c.dialCode.startsWith(digits)) return true;
      return false;
    });
  }, [query]);

  function closePanel() {
    const panel = panelRef.current;
    if (!panel || !open) {
      setOpen(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      return;
    }
    gsap.to(panel, {
      autoAlpha: 0,
      y: -6,
      scale: 0.97,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });
  }

  function openPanel() {
    if (disabled) return;
    const idx = COUNTRIES.findIndex((c) => c.iso2 === country.iso2);
    setHighlighted(idx >= 0 ? idx : 0);
    setQuery("");
    setOpen(true);
  }

  function selectCountry(c: Country) {
    commit(c, national);
    closePanel();
    requestAnimationFrame(() => numberRef.current?.focus());
  }

  // Outside click + escape.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closePanel();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Focus the search field once the panel is in the DOM.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Keep the highlighted row visible while navigating by keyboard.
  useEffect(() => {
    if (!open) return;
    const row = listRef.current?.children[highlighted] as HTMLElement | undefined;
    row?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  // Panel open animation.
  useGSAP(
    () => {
      if (!open) return;
      const panel = panelRef.current;
      if (!panel) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: -8, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "power3.out" }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
      });
      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [open] }
  );

  // List filter animation — re-fires on every search keystroke without re-fading the panel shell.
  useGSAP(
    () => {
      if (!open) return;
      const rows = listRef.current?.querySelectorAll(".phone-input-option");
      if (!rows?.length) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(rows, {
          autoAlpha: 0,
          y: 5,
          duration: 0.18,
          ease: "power2.out",
          stagger: { each: 0.01, from: "start", amount: 0.18 },
        });
      });
      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [open, query] }
  );

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = filtered[highlighted];
      if (pick) selectCountry(pick);
    }
  }

  return (
    <div ref={wrapRef} className={`phone-input${className ? ` ${className}` : ""}`}>
      <input type="hidden" name={name} value={combined} />
      <button
        type="button"
        ref={triggerRef}
        className="phone-input-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, currently ${country.name}, plus ${country.dialCode}`}
        onClick={() => (open ? closePanel() : openPanel())}
      >
        <span className="phone-input-flag" aria-hidden>
          {flagEmoji(country.iso2)}
        </span>
        <span className="phone-input-dial">+{country.dialCode}</span>
        <ChevronDownIcon
          width={14}
          height={14}
          className="phone-input-chevron"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      <input
        ref={numberRef}
        id={inputId}
        className="input phone-input-number"
        style={{ paddingLeft: triggerWidth + 10 }}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        placeholder="98765 43210"
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        value={national}
        maxLength={Math.max(4, 15 - country.dialCode.length)}
        onChange={(e) => commit(country, e.target.value.replace(/[^\d]/g, ""))}
      />
      {open && (
        <div ref={panelRef} className="phone-input-panel" role="listbox">
          <div className="phone-input-search">
            <SearchIcon width={15} height={15} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country or code"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlighted(0);
              }}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <div ref={listRef} className="phone-input-list">
            {filtered.length === 0 && <p className="phone-input-empty">No countries found</p>}
            {filtered.map((c, i) => (
              <button
                type="button"
                key={c.iso2}
                className={`phone-input-option${i === highlighted ? " is-highlighted" : ""}`}
                role="option"
                aria-selected={c.iso2 === country.iso2}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => selectCountry(c)}
              >
                <span className="phone-input-flag" aria-hidden>
                  {flagEmoji(c.iso2)}
                </span>
                <span className="phone-input-option-name">{c.name}</span>
                <span className="phone-input-option-dial">+{c.dialCode}</span>
                {c.iso2 === country.iso2 && <CheckIcon width={14} height={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
