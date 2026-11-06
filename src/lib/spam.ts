
const hits = new Map<string, number[]>();

/** Max `limit` submissions per IP per `windowMs`. */
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > limit;
}

/** Honeypot filled or form submitted unrealistically fast → bot. */
export function looksLikeBot(form: FormData) {
  if (String(form.get("website") || "").trim()) return true;
  const elapsed = Number(form.get("elapsed") || 0);
  return elapsed > 0 && elapsed < 2500;
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}
