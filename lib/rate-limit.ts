const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Prune expired buckets with a 5% chance to prevent memory leak
  if (Math.random() < 0.05) {
    for (const [k, bucket] of buckets.entries()) {
      if (bucket.resetAt <= now) {
        buckets.delete(k);
      }
    }
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function getClientKey(request: Request, action: string): string {
  const forwarded = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "local";
  return `${action}:${forwarded.split(",")[0].trim()}`;
}
