"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Lock,
  KeyRound,
  CheckCircle,
  User,
  X,
} from "lucide-react";
import { trips } from "@/data/trips";
import type { Trip } from "@/data/trips";
import { ChatItemRenderer } from "@/components/chatbot/ChatItemRenderer";

const TERMINALS = [
  { city: "HCM", name: "Bến xe Miền Đông", addr: "Đường Quoc Lo 1, Quận Bình Thạnh" },
  { city: "HCM", name: "Bến xe Miền Tây", addr: "Khu vực 1, Quận Bình Tân" },
  { city: "Hà Nội", name: "Bến xe Mỹ Đình", addr: "Đường Phạm Văn Đồng, Quận Nam Từ Liêm" },
  { city: "Hà Nội", name: "Bến xe Giáp Bát", addr: "Đường Giáp Bát, Quận Hoàng Mai" },
  { city: "Đà Nẵng", name: "Bến xe Đà Nẵng", addr: "Đường Tôn Đức Thắng, Quận Hải Châu" },
  { city: "Nha Trang", name: "Bến xe Nha Trang", addr: "Đường 23/10, Thành phố Nha Trang" },
];

const QUIZ_QUESTIONS = [
  { q: "Bạn thường đi du lịch một mình hay cùng nhóm?", o: ["Một mình", "Cùng nhóm", "Cả hai"] },
  { q: "Bạn thích đi vào mùa nào?", o: ["Mùa hè", "Mùa đông", "Không quan trọng"] },
  { q: "Ngân sách cho mỗi chuyến đi?", o: ["Tiết kiệm (<500k)", "Phổ thông (500k-1tr)", "Cao cấp (>1tr)"] },
  { q: "Bạn thích loại xe nào?", o: ["Ghế ngồi", "Giường nằm", "Cả hai"] },
  { q: "Thời gian chuyến đi lý tưởng?", o: ["Ngắn (dưới 4h)", "Trung bình (4-12h)", "Dài (trên 12h)"] },
  { q: "Bạn ưu tiên điều gì nhất?", o: ["Giá rẻ", "Tiện nghi", "Thời gian"] },
  { q: "Bạn thường đi đâu?", o: ["Miền Bắc", "Miền Trung", "Miền Nam", "Cả nước"] },
  { q: "Bạn có mang nhiều hành lý không?", o: ["Ít (dưới 10kg)", "Vừa (10-20kg)", "Nhiều (trên 20kg)"] },
  { q: "Bạn thích đi ban ngày hay ban đêm?", o: ["Ban ngày", "Ban đêm", "Không quan trọng"] },
  { q: "Câu cuối: Bạn muốn AI gợi ý 'Tiết kiệm' hay 'Tiện nghi'?", o: ["Tiết kiệm & Thực tế", "Tiện nghi & Sang trọng"] },
];

type ChatItem =
  | { type: "bot"; text: string }
  | { type: "user"; text: string }
  | { type: "action-menu" }
  | { type: "route-form" }
  | { type: "route-result"; recommendedTrip: Trip }
  | { type: "quiz-options"; step: number; options: string[] }
  | { type: "travel-plan"; destinations: string[]; budget: string }
  | { type: "route-cards"; trips: Array<{ id: string; display: "route" | "map" }> }
  | { type: "travel-set"; setName: string; tripIds: string[] }
  | { type: "catalog"; filter: string }
  | { type: "city-select" }
  | { type: "terminal-list"; city: string }
  | { type: "trip-category" }
  | { type: "trip-form" }
  | { type: "trip-result"; recommendedTrip: Trip }
  | { type: "travel-plan-card"; budget: string; duration: string; vehicleType: string }
  | { type: "typing" };

interface UserProfile {
  budget: string | null;
  style: string | null;
}


export function ChatbotPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Chat state
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({ budget: null, style: null });
  const [showProfile, setShowProfile] = useState(false);

  // Access code state
  const [accessCode, setAccessCode] = useState("");
  const [codeValidated, setCodeValidated] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState<number | null>(null);
  const [validatingCode, setValidatingCode] = useState(false);

  // Splash state (starts hidden — only shows after code validation)
  const [showSplash, setShowSplash] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);

  // AI conversation history for context
  const [aiHistory, setAiHistory] = useState<Array<{ role: string; text: string }>>([]);

  // Persistent session context — accumulates ALL flow interactions, sent with EVERY AI call
  const [sessionContext, setSessionContext] = useState<string[]>([]);
  const appendContext = useCallback((ctx: string) => {
    setSessionContext((prev) => [...prev, ctx]);
  }, []);

  // Trip form state
  const [tripForm, setTripForm] = useState({ passengers: "", luggage: "" });

  // ─── SCROLL TO BOTTOM ───────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  }, []);

  // ─── ADD MESSAGES ───────────────────────────────────────────────
  const addBot = useCallback(
    (text: string, extraItems?: ChatItem[]) => {
      setMessages((prev) => {
        const next = [...prev, { type: "bot" as const, text }];
        if (extraItems) next.push(...extraItems);
        return next;
      });
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const addUser = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { type: "user" as const, text }]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const addItem = useCallback(
    (item: ChatItem) => {
      setMessages((prev) => [...prev, item]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  // ─── INTRO SEQUENCE (only after code is validated) ────────────
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    if (!codeValidated || introPlayed) return;
    setIntroPlayed(true);
    setShowSplash(true);
    setSplashProgress(100);
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Start intro sequence
      setTimeout(() => {
        addBot("Xin chào! Tôi là **Trợ lý AI FUTA Bus Lines**. 🇻🇳");
        setTimeout(() => {
          addBot(
            "Tôi ở đây để giúp bạn tìm tuyến xe phù hợp, lên kế hoạch chuyến đi, và trả lời mọi câu hỏi về dịch vụ của chúng tôi."
          );
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { type: "bot", text: "Bạn muốn bắt đầu từ đâu để chúng ta hiểu nhau hơn?" },
              { type: "action-menu" },
            ]);
            scrollToBottom();
          }, 800);
        }, 1000);
      }, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [codeValidated, addBot, scrollToBottom]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── ACCESS CODE VALIDATION ─────────────────────────────────────
  const handleValidateCode = async () => {
    setValidatingCode(true);
    setCodeError(null);
    try {
      const res = await fetch("/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: accessCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCodeError(data.error || "Invalid code");
        return;
      }
      setCodeValidated(true);
      setRemainingUses(data.remaining);
    } catch {
      setCodeError("Failed to validate code");
    } finally {
      setValidatingCode(false);
    }
  };


  // ─── FREE TEXT / AI CHAT ────────────────────────────────────────
  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || !codeValidated) return;
    setInputText("");
    addUser(text);

    // Always include session context so AI knows full user journey
    let messageToSend = text;
    if (sessionContext.length > 0) {
      messageToSend = `[Bối cảnh phiên tư vấn: ${sessionContext.join(" | ")}] Câu hỏi/yêu cầu từ khách: ${text}`;
    }

    // All messages go through real Gemini API
    // Show typing indicator
    setIsTyping(true);
    addItem({ type: "typing" });

    try {
      const res = await fetch("/api/chatbot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: aiHistory,
          accessCode,
        }),
      });

      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.type !== "typing"));
      setIsTyping(false);

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 403) {
          // Code exhausted — reset to code gate (matches /generate & /caption)
          setCodeValidated(false);
          setRemainingUses(0);
          setCodeError(data.error || "Access denied");
        }
        addBot(data.error || "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      const data = await res.json();
      setAiHistory((prev) => [
        ...prev,
        { role: "user", text: messageToSend },
        { role: "model", text: data.reply },
      ]);

      // Parse [SET:SetName|id1,id2,...] tags from AI response
      const setTagRegex = /\[SET:([^|]+)\|((?:[^,]+,?)+)\]/g;
      const travelSets: Array<{ setName: string; routeIds: string[] }> = [];
      const setRouteIds = new Set<string>();
      let setMatch;
      while ((setMatch = setTagRegex.exec(data.reply)) !== null) {
        const ids = setMatch[2].split(",").filter(Boolean);
        travelSets.push({ setName: setMatch[1], routeIds: ids });
        ids.forEach((id) => setRouteIds.add(id));
      }

      // Parse [ROUTE:id:display] tags from AI response
      const routeTagRegex = /\[ROUTE:([^:]+)(?::([^\]]+))?\]/g;
      const foundRoutes: Array<{ id: string; display: "route" | "map" }> = [];
      const seenIds = new Set<string>();
      let match;
      while ((match = routeTagRegex.exec(data.reply)) !== null) {
        if (!seenIds.has(match[1]) && !setRouteIds.has(match[1])) {
          seenIds.add(match[1]);
          foundRoutes.push({ id: match[1], display: (match[2] as "route" | "map") || "route" });
        }
      }

      // Strip all tags from displayed text
      let cleanReply = data.reply
        .replace(/\s*\[SET:[^\]]+\]/g, "")
        .replace(/\s*\[ROUTE:[^\]]+\]/g, "")
        .trim();
      addBot(cleanReply);

      // Show travel plan sets first
      for (const set of travelSets) {
        addItem({ type: "travel-set", setName: set.setName, tripIds: set.routeIds });
      }

      // Show remaining individual route cards (not already in a set)
      if (foundRoutes.length > 0) {
        addItem({ type: "route-cards", trips: foundRoutes });
      }

      // Update remaining uses
      try {
        const checkRes = await fetch("/api/validate-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: accessCode }),
        });
        const checkData = await checkRes.json();
        if (checkRes.ok) setRemainingUses(checkData.remaining);
        else setRemainingUses(0);
      } catch {
        // Non-critical
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.type !== "typing"));
      setIsTyping(false);
      addBot("Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleRouteSearch = () => {
    addUser("Tìm chuyến xe");
    addItem({ type: "route-form" });
  };

  const handleSelectTrip = (tripId: string) => {
    addUser(`Đã chọn chuyến xe ${tripId}`);
    router.push(`/booking?tripId=${tripId}`);
  };

  const handleTripPlanning = () => {
    addUser("Tư vấn chuyến đi");
    addItem({ type: "trip-category" });
  };

  const handleQuiz = () => {
    addUser("Quiz du lịch");
    const q = QUIZ_QUESTIONS[0];
    addBot(`1/10: ${q.q}`);
    addItem({ type: "quiz-options", step: 0, options: q.o });
  };

  const handleTerminalLookup = () => {
    addUser("Tìm bến xe");
    addItem({ type: "city-select" });
  };

  const handleQuizAnswer = (answer: string, step: number) => {
    addUser(answer);
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setTimeout(() => {
        const q = QUIZ_QUESTIONS[step + 1];
        addBot(`${step + 2}/10: ${q.q}`);
        addItem({ type: "quiz-options", step: step + 1, options: q.o });
      }, 400);
    } else {
      const quizSummary = newAnswers.map((a, idx) => `${QUIZ_QUESTIONS[idx].q}: ${a}`).join("; ");
      appendContext(`Khách hàng hoàn thành Travel Quiz. Kết quả: ${quizSummary}`);

      const budgetAnswer = newAnswers[2] || "";
      const durationAnswer = newAnswers[4] || "";
      const typeAnswer = newAnswers[3] || "";
      const styleName = budgetAnswer.includes("Tiết kiệm") ? "Tiết kiệm"
        : budgetAnswer.includes("Phổ thông") ? "Phổ thông"
        : "Cao cấp";

      setProfile((p) => ({ ...p, budget: styleName }));

      setTimeout(() => {
        addBot("Dựa trên câu trả lời của bạn, tôi đề xuất kế hoạch du lịch:");
        addItem({ type: "travel-plan-card", budget: styleName, duration: durationAnswer, vehicleType: typeAnswer });
        setTimeout(() => addItem({ type: "action-menu" }), 800);
      }, 600);
    }
  };

  const handleCitySelect = (city: string) => {
    addUser(city);
    addItem({ type: "terminal-list", city });
  };

  const viewCatalog = (filter: string = "all") => {
    addUser(`Xem danh sách tuyến ${filter !== "all" ? filter : ""}`);
    setTimeout(() => {
      addBot("Đây là danh sách tuyến xe FUTA Bus hiện có:");
      addItem({ type: "catalog", filter });
    }, 400);
  };

  // ─── PROFILE SIDEBAR CONTENT (shared between drawer and desktop sidebar) ──
  const profileContent = (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-2xl">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
          Ngân sách du lịch
        </p>
        <div className="font-black text-[#f97316]">
          {profile.budget || "Chưa có dữ liệu"}
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-2xl">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
          Phong cách du lịch
        </p>
        <div className="font-black text-gray-900 italic">
          {profile.style || "Chưa xác định"}
        </div>
      </div>
      <div className="border-t pt-4">
        <h4 className="text-xs font-black mb-4 uppercase">Lịch sử tư vấn</h4>
        <div className="space-y-3 text-sm">
          {aiHistory.length > 0 ? (
            aiHistory
              .filter((h) => h.role === "user")
              .slice(-5)
              .map((h, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600">
                  {h.text}
                </div>
              ))
          ) : (
            <p className="text-gray-400 italic text-xs">
              Lịch sử sẽ xuất hiện sau khi bạn hoàn thành Quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // ─── RENDER ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* SPLASH SCREEN */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-[999] bg-[#1c243d] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-4xl font-black mb-4 tracking-tight"
            >
              FUTA Bus Lines
            </motion.div>
            <div className="w-[200px] h-1 bg-white/10 rounded-full overflow-hidden mt-5">
              <motion.div
                className="h-full bg-[#f97316] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${splashProgress}%` }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4 font-bold">
              FUTA Digital Assistant
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER — full width, matching /caption pattern */}
      <header className="px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Home</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#f97316]">FUTA®</span>
          <span className="text-[10px] font-medium text-gray-400 tracking-widest uppercase">
            AI Assistant
          </span>
        </div>
        {/* Profile button — visible only on mobile/tablet (desktop has sidebar) */}
        <button
          onClick={() => setShowProfile(true)}
          className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
        {/* Spacer on desktop to balance header */}
        <div className="hidden lg:block w-10" />
      </header>

      {/* FULL-PAGE ACCESS CODE GATE — blocks entire chatbot until verified */}
      {!codeValidated && !showSplash && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4"
        >
          <div className="w-20 h-20 rounded-full bg-[#f97316]/10 flex items-center justify-center">
            <Lock className="w-10 h-10 text-[#f97316]" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Nhập mã truy cập
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Nhập mã truy cập được cung cấp để sử dụng Trợ lý AI FUTA.
            </p>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value.toUpperCase());
                  setCodeError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && accessCode.trim()) handleValidateCode();
                }}
                placeholder="Nhập mã của bạn"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-mono tracking-widest focus:border-[#f97316] focus:outline-none transition-colors uppercase"
                autoFocus
              />
            </div>

            {codeError && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {codeError}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleValidateCode}
              disabled={!accessCode.trim() || validatingCode}
              className="w-full py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {validatingCode ? "Đang xác thực..." : "Xác thực & Bắt đầu"}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* CHATBOT UI — only visible after code is validated */}
      {codeValidated && (
        <>
          {/* Validated banner */}
          <div className="px-4 md:px-8 py-2 bg-green-50 border-b border-green-200">
            <div className="max-w-3xl mx-auto flex items-center gap-2 text-green-700 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="font-medium">AI Assistant active</span>
              {remainingUses !== null && (
                <span className="text-green-500">({remainingUses} credits left)</span>
              )}
            </div>
          </div>

          {/* MAIN CONTENT — responsive 2-column on desktop */}
          <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
            {/* CHAT COLUMN */}
            <div className="flex-1 flex flex-col min-w-0 relative">
              <main
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-[100px]"
                style={{ scrollBehavior: "smooth" }}
              >
                <div className="max-w-2xl mx-auto flex flex-col gap-1">
                  {(() => {
                    // Find index of last user message — all interactive items before it are disabled
                    const lastUserIdx = messages.reduce((acc, m, idx) => m.type === "user" ? idx : acc, -1);
                    return messages.map((msg, i) => (
                      <ChatItemRenderer
                        key={i}
                        item={msg}
                        index={i}
                        interactionDisabled={i < lastUserIdx}
                        trips={trips}
                        terminals={TERMINALS}
                        onRouteSearch={handleRouteSearch}
                        onTripPlanning={handleTripPlanning}
                        onQuiz={handleQuiz}
                        onTerminalLookup={handleTerminalLookup}
                        onQuizAnswer={handleQuizAnswer}
                        onCitySelect={handleCitySelect}
                        onViewCatalog={viewCatalog}
                        onSelectTrip={handleSelectTrip}
                        tripForm={tripForm}
                        setTripForm={setTripForm}
                        addItem={addItem}
                      />
                    ));
                  })()}
                </div>
              </main>

              {/* INPUT AREA — sticky bottom within chat column */}
              <div className="sticky bottom-0 p-4 md:px-8 bg-white/95 backdrop-blur-md border-t border-gray-100 flex gap-2 items-center">
                <div className="max-w-2xl mx-auto flex gap-2 items-center w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    placeholder="Hỏi tôi bất cứ điều gì..."
                    disabled={isTyping}
                    className="flex-1 bg-gray-100 p-4 rounded-2xl outline-none text-sm font-medium border-2 border-transparent focus:border-[#f97316] transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isTyping || !inputText.trim()}
                    className="w-12 h-12 bg-[#f97316] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 disabled:opacity-40 cursor-pointer hover:bg-[#ea580c] transition-colors shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* DESKTOP SIDEBAR — persistent profile panel on lg+ */}
            <aside className="hidden lg:block w-80 shrink-0 border-l border-gray-200 bg-white p-6 overflow-y-auto sticky top-[65px] h-[calc(100vh-65px)]">
              <h3 className="font-black italic text-xl text-gray-900 mb-6">MY PROFILE</h3>
              {profileContent}
            </aside>
          </div>

          {/* MOBILE/TABLET PROFILE DRAWER */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[200] lg:hidden"
                onClick={() => setShowProfile(false)}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black italic text-xl text-gray-900">MY PROFILE</h3>
                    <button
                      onClick={() => setShowProfile(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {profileContent}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
