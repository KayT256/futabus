"use client";

import { PageShell } from "@/components/PageShell";
import { DailyQuiz } from "@/components/DailyQuiz";
import { useRouter } from "next/navigation";

export const DailyQuizPage = () => {
  const router = useRouter();

  return (
    <PageShell title="Quiz Hàng Ngày">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.push("/mini-games")}
          className="mb-4 text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"
        >
          ← Quay lại
        </button>
        <DailyQuiz />
      </div>
    </PageShell>
  );
};
