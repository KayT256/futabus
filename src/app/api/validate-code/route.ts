import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getCreditsPerCode, getCreditCostChat } from "@/lib/credits";

const REDIS_KEY_PREFIX = "code_usage:";
const RATE_LIMIT_PREFIX = "rl_validate:";
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const MIN_RESPONSE_MS = 1000;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function getValidCodes(): string[] {
  const raw = process.env.ACCESS_CODES || "";
  return raw.split(",").map((c) => c.trim()).filter(Boolean);
}

// Constant-time response: prevents timing-based code enumeration. The 1s floor
// also blunts brute-force attempts since each attempt costs at least 1s.
async function enforceMinResponseTime<T>(startTime: number, result: T): Promise<T> {
  const elapsed = Date.now() - startTime;
  if (elapsed < MIN_RESPONSE_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_RESPONSE_MS - elapsed));
  }
  return result;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Access code is required" },
        { status: 400 }
      ));
    }

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Service unavailable" },
        { status: 500 }
      ));
    }

    const redis = getRedis();
    if (!redis) {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Service unavailable - Redis not configured" },
        { status: 500 }
      ));
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimitKey = `${RATE_LIMIT_PREFIX}${ip}`;
    const attempts = await redis.incr(rateLimitKey);
    if (attempts === 1) {
      await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
    }
    if (attempts > RATE_LIMIT_MAX) {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      ));
    }

    const validCodes = getValidCodes();
    if (validCodes.length === 0) {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Service unavailable" },
        { status: 500 }
      ));
    }

    const trimmedCode = code.trim().toUpperCase();

    if (!validCodes.map((c) => c.toUpperCase()).includes(trimmedCode)) {
      // Same generic error as exhausted to prevent enumeration of valid codes
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Invalid or exhausted access code" },
        { status: 403 }
      ));
    }

    const redisKey = `${REDIS_KEY_PREFIX}${trimmedCode}`;
    const currentUsage = ((await redis.get<number>(redisKey)) ?? 0);
    const maxCredits = getCreditsPerCode();
    const remaining = maxCredits - currentUsage;

    if (remaining <= 0) {
      return enforceMinResponseTime(startTime, NextResponse.json(
        { error: "Invalid or exhausted access code" },
        { status: 403 }
      ));
    }

    return enforceMinResponseTime(startTime, NextResponse.json({
      valid: true,
      remaining,
      total: maxCredits,
      used: currentUsage,
      costs: { chat: getCreditCostChat() },
    }));
  } catch (error: unknown) {
    console.error("Validate code error:", error);
    return enforceMinResponseTime(startTime, NextResponse.json(
      { error: "Failed to validate code", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    ));
  }
}
