import { useState } from "react";
import { Wheel } from "react-custom-roulette-r19";
import { useVouchers } from "@/contexts/VoucherContext";
import { toast } from "sonner";

// Prize pool for roulette with varied prizes
const PRIZES = [
  { text: "10%", discount: 10, color: "#FF6B6B", type: "percent" },
  { text: "Không", discount: 0, color: "#4ECDC4", type: "none" },
  { text: "50K", discount: 50000, color: "#45B7D1", type: "fixed" },
  { text: "5%", discount: 5, color: "#96CEB4", type: "percent" },
  { text: "Không", discount: 0, color: "#FFEAA7", type: "none" },
  { text: "100K", discount: 100000, color: "#DDA0DD", type: "fixed" },
  { text: "15%", discount: 15, color: "#98D8C8", type: "percent" },
  { text: "Không", discount: 0, color: "#F7DC6F", type: "none" },
  { text: "200K", discount: 200000, color: "#E74C3C", type: "fixed" },
  { text: "20%", discount: 20, color: "#3498DB", type: "percent" },
  { text: "Không", discount: 0, color: "#1ABC9C", type: "none" },
  { text: "7", discount: 77777, color: "#9B59B6", type: "special" },
];

export const RouletteGame = () => {
  const { canPlayRoulette, addVoucher, setGameAvailabilityState } = useVouchers();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleSpin = () => {
    if (!canPlayRoulette()) {
      toast.error("Bạn chưa thể chơi roulette!", {
        description: "Bạn cần hoàn thành ít nhất 1 chuyến để chơi.",
      });
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * PRIZES.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setHasPlayed(true);
    
    const prize = PRIZES[prizeNumber];
    
    if (prize.discount > 0) {
      // Determine discount type based on prize type
      const discountType = prize.type === "percent" ? "percentage" : "fixed";
      
      addVoucher({
        code: `ROULETTE${prize.discount}${Date.now()}`,
        wallet: "futapay",
        saving: prize.discount,
        label: prize.type === "special"
          ? "Giải đặc biệt: 77.777K - Roulette"
          : prize.type === "fixed"
          ? `Giảm ${prize.discount}K - Roulette`
          : `Giảm ${prize.discount}% - Roulette`,
        source: "roulette",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        gameMetadata: { gameType: "roulette" },
        discountType,
      });

      toast.success("Chúc mừng!", {
        description: `Bạn đã nhận được voucher ${prize.text}!`,
      });
    } else {
      toast.info("Rất tiếc!", {
        description: "Bạn chưa nhận được giải thưởng lần này. Hãy thử lại sau!",
      });
    }

    // Update game availability state
    const today = new Date().toISOString().split("T")[0];
    setGameAvailabilityState({
      lastPlayedDate: today,
      tripsSinceLastPlay: 0,
    });
  };

  const data = PRIZES.map((prize) => ({
    option: prize.text,
    style: { backgroundColor: prize.color },
  }));

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎰</div>
        <h3 className="font-bold text-lg text-amber-900 mb-2">Vòng Quay May Mắn</h3>
        <p className="text-sm text-amber-700">
          Quay vòng quay để nhận voucher giảm giá!
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={PRIZES.map((p) => p.color)}
          textColors={["#ffffff"]}
          onStopSpinning={handleStopSpinning}
          spinDuration={0.5}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        {PRIZES.map((prize, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-2 flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: prize.color }}
            />
            <span className="font-medium text-amber-900">{prize.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSpin}
        disabled={mustSpin || hasPlayed || !canPlayRoulette()}
        className="w-full bg-amber-600 text-white font-medium py-3 rounded-xl hover:bg-amber-700 transition-colors disabled:bg-amber-300 disabled:text-amber-600 disabled:cursor-not-allowed"
      >
        {mustSpin ? "Đang quay..." : hasPlayed ? "Đã hoàn thành" : "Quay ngay"}
      </button>

      {!canPlayRoulette() && !hasPlayed && (
        <p className="text-xs text-amber-600 mt-2 text-center">
          Bạn cần hoàn thành ít nhất 1 chuyến để chơi.
        </p>
      )}
    </div>
  );
};
