/**
 * Structured logging for auth failures and access-control rejections.
 * Deliberately just console output — every common host (Vercel, Docker,
 * systemd) captures stdout/stderr as queryable logs, so this is enough to
 * wire a log drain (Datadog, Axiom, etc.) on top of later without changing
 * call sites.
 */
export function logSecurityEvent(event: string, data: Record<string, string | number | boolean | null | undefined>) {
  console.warn(JSON.stringify({ event, ...data, ts: new Date().toISOString() }));
}
