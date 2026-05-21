import { PageShell } from "@/components/PageShell";
import { useVouchers } from "@/contexts/VoucherContext";
import { useNavigate } from "react-router-dom";

export const MiniGamePage = () => {
  const { vouchers } = useVouchers();
  const navigate = useNavigate();

  const gameVouchers = vouchers.filter((v) => v.source !== "payment" && !v.used);

  return (
    <PageShell title="Trò Chơi & Voucher">
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold mb-2">🎮 Chơi Trò Chơi Nhận Voucher</h1>
          <p className="text-purple-100">
            Tham gia các trò chơi thú vị để nhận voucher giảm giá cho chuyến đi tiếp theo của bạn!
          </p>
        </div>

        {/* Vouchers Section */}
        {gameVouchers.length > 0 && (
          <div className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-sm mb-6">
            <div className="px-4 py-3 border-b border-purple-200">
              <h2 className="font-semibold text-sm text-purple-900">Voucher Đã Nhận</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {gameVouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {voucher.source === "daily_quiz" ? "Quiz" : "Roulette"}
                      </span>
                      <span className="text-xs text-purple-500">
                        {new Date(voucher.earnedAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="font-bold text-purple-900 mb-1">{voucher.label}</p>
                    <p className="text-sm text-purple-700">
                      Giảm: {voucher.saving.toLocaleString("vi-VN")}đ
                    </p>
                    {voucher.expiresAt && (
                      <p className="text-xs text-purple-500 mt-1">
                        Hết hạn: {new Date(voucher.expiresAt).toLocaleDateString("vi-VN")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Games Grid - Dashboard style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Quiz Card */}
          <div
            onClick={() => navigate("/mini-games/quiz")}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold text-lg mb-2">Quiz Hàng Ngày</h3>
            <p className="text-sm text-blue-100 mb-3">
              Trả lời câu hỏi về du lịch Việt Nam để nhận voucher giảm giá.
            </p>
            <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
              1 lần/ngày
            </div>
          </div>

          {/* Roulette Card */}
          <div
            onClick={() => navigate("/mini-games/roulette")}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">🎰</div>
            <h3 className="font-bold text-lg mb-2">Vòng Quay May Mắn</h3>
            <p className="text-sm text-amber-100 mb-3">
              Quay vòng quay để nhận voucher ngẫu nhiên sau mỗi chuyến đi.
            </p>
            <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
              Sau mỗi chuyến
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="font-semibold text-sm text-slate-900">Quy Tắc Chơi</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-purple-600 font-bold">📚</div>
              <div>
                <h3 className="font-medium text-slate-900 text-sm">Quiz Hàng Ngày</h3>
                <p className="text-xs text-slate-600">
                  Trả lời 10 câu hỏi về du lịch Việt Nam. Đúng 8/10 nhận 10% giảm giá, đúng 10/10 nhận 15% giảm giá.
                  Chỉ chơi được 1 lần mỗi ngày.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-amber-600 font-bold">🎰</div>
              <div>
                <h3 className="font-medium text-slate-900 text-sm">Vòng Quay May Mắn</h3>
                <p className="text-xs text-slate-600">
                  Quay vòng quay để nhận voucher ngẫu nhiên. Có thể chơi sau mỗi lần hoàn thành chuyến đi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};
