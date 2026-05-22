import { Redis } from "@upstash/redis";

const REDIS_KEY_PREFIX = "code_usage:";

export function getCreditsPerCode(): number {
  return parseInt(process.env.CREDITS_PER_CODE || "10", 10);
}

export function getCreditCostChat(): number {
  return parseInt(process.env.CREDIT_COST_CHAT || "1", 10);
}

export function getValidCodes(): string[] {
  const raw = process.env.ACCESS_CODES || "";
  return raw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

export async function validateAndConsumeCredits(
  code: string,
  cost: number
): Promise<{ valid: boolean; error?: string; remaining?: number }> {
  if (!code || typeof code !== "string") {
    return { valid: false, error: "Access code is required" };
  }

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return { valid: false, error: "Rate limiting not configured" };
  }

  const validCodes = getValidCodes();
  const trimmedCode = code.trim().toUpperCase();

  if (!validCodes.map((c) => c.toUpperCase()).includes(trimmedCode)) {
    return { valid: false, error: "Invalid access code" };
  }

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const maxCredits = getCreditsPerCode();

    // Atomic increment by cost — no race condition
    const newCount = await redis.incrby(`${REDIS_KEY_PREFIX}${trimmedCode}`, cost);

    if (newCount > maxCredits) {
      // Over limit — decrement back and reject
      await redis.decrby(`${REDIS_KEY_PREFIX}${trimmedCode}`, cost);
      return { valid: false, error: "This code has been fully used" };
    }

    return { valid: true, remaining: maxCredits - newCount };
  } catch (error) {
    console.error("Redis error in validateAndConsumeCredits:", error);
    return { valid: false, error: "Service temporarily unavailable" };
  }
}

export async function getCodeUsage(
  code: string
): Promise<{ remaining: number; total: number }> {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  const trimmedCode = code.trim().toUpperCase();
  const currentUsage =
    (await redis.get<number>(`${REDIS_KEY_PREFIX}${trimmedCode}`)) ?? 0;
  const maxCredits = getCreditsPerCode();

  return {
    remaining: Math.max(0, maxCredits - currentUsage),
    total: maxCredits,
  };
}
