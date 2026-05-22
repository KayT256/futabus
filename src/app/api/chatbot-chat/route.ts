import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { Redis } from "@upstash/redis";
import { validateAndConsumeCredits, getCreditCostChat } from "@/lib/credits";
import { trips } from "@/data/trips";

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_PREFIX = "rl_chat:";
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_SECONDS = 60;

function buildSystemInstruction(): string {
  const catalog = trips
    .map((t) => `[${t.id}] ${t.route} | ${t.busType} | ${t.duration} | ${t.price.toLocaleString("vi-VN")}đ`)
    .join("\n");

  return `You are the FUTA Bus Lines AI Assistant for Vietnam. You are a friendly, knowledgeable travel advisor who speaks Vietnamese naturally but can switch to English when needed.

Your personality:
- Warm, helpful, and enthusiastic about helping customers travel safely
- Expert knowledge of FUTA's bus routes, terminals, and services
- You understand Vietnamese travel culture and preferences

Your capabilities:
- Route recommendations between Vietnamese cities
- Trip planning and budget advice
- Deep knowledge of the ACTUAL FUTA Vietnam route catalog below
- Terminal locations across Vietnam
- Service information (FUTAPay, vouchers, mini-games)

=== FUTA VIETNAM TRIP CATALOG ===
Format: [trip_id] Route | Bus Type | Duration | Price
${catalog}
=== END CATALOG ===

TRIP REFERENCE RULES:
You have TWO ways to show trips to the customer:

**Option A: Individual Trip Cards** — use [TRIP:id:display] tags
- Use when: answering a specific question, suggesting a single trip, or comparing options
- display_mode: "trip" (trip info card) or "map" (trip shown on map)
- Example: "Tôi gợi ý **Chuyến HCM - Đà Lạt** [TRIP:t-001:trip]"

**Option B: Travel Plan Set** — use [SET:SetName|id1,id2,id3] tag
- Use when: recommending a multi-leg trip or themed travel package
- Example: [SET:Khám phá miền Trung|t-005,t-006,t-007]

WHEN TO USE WHICH:
- Customer asks for a specific trip → [TRIP:id:trip]
- Customer asks to see trip on map → [TRIP:id:map]
- Customer asks for a multi-stop trip → [SET:...]

FORMATTING RULES (the frontend renders markdown):
- Use line breaks between paragraphs
- Use bullet points (* item) when listing multiple items
- Use **bold** for trip names, prices, and key emphasis
- Structure responses clearly: intro line, then details, then closing

Easter egg:
- If the customer mentions "Lan Anh", respond enthusiastically: "Có chứ! Lan Anh là khách hàng VIP của FUTA. Chúc bạn có chuyến đi an toàn và vui vẻ! 💖"

Rules:
- Keep responses conversational and well-structured
- If asked about non-FUTA topics, gently redirect to travel/transportation
- Always be positive and encouraging
- ALWAYS reference specific trips from the catalog — never invent trip names or IDs
- Do NOT mention any AI model names or technical details
- Respond in the same language the user writes in (Vietnamese or English)
- Mention prices in VND when recommending trips`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, accessCode } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    if (conversationHistory && Array.isArray(conversationHistory)) {
      if (conversationHistory.length > MAX_MESSAGES) {
        return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
      }
    }

    // IP-based rate limiting (only when Redis configured — local dev may not have it)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const rateLimitKey = `${RATE_LIMIT_PREFIX}${ip}`;
      const attempts = await redis.incr(rateLimitKey);
      if (attempts === 1) {
        await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
      }
      if (attempts > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests. Please slow down." },
          { status: 429 }
        );
      }
    }

    // Consume credits per AI message — happens here (not in /validate-code)
    // so an exhausted code can still be detected at chat time, not just login.
    const creditCost = getCreditCostChat();
    const codeResult = await validateAndConsumeCredits(accessCode, creditCost);
    if (!codeResult.valid) {
      return NextResponse.json({ error: codeResult.error }, { status: 403 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-20)) {
        if (msg.role === "user" || msg.role === "model") {
          contents.push({
            role: msg.role,
            parts: [{ text: String(msg.text).slice(0, MAX_MESSAGE_LENGTH) }],
          });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: buildSystemInstruction(),
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        ],
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    return NextResponse.json({
      reply: text,
      remaining: codeResult.remaining,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    console.error("Chatbot chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}
