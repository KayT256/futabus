"use client";

import { PageShell } from "@/components/PageShell";
import { RouletteGame } from "@/components/RouletteGame";
import { useRouter } from "next/navigation";

export const RoulettePage = () => {
  const router = useRouter();

  return (
    <PageShell title="Vòng Quay May Mắn">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.push("/mini-games")}
          className="mb-4 text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"
        >
          ← Quay lại
        </button>
        <RouletteGame />
      </div>
    </PageShell>
  );
};
