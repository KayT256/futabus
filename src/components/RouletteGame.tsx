import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useVouchers } from "@/contexts/VoucherContext";
import { toast } from "sonner";

// Prize pool for roulette
const PRIZES = [
  { text: "10%", discount: 10, color: "#FF6B6B" },
  { text: "Không", discount: 0, color: "#4ECDC4" },
  { text: "50K", discount: 50000, color: "#45B7D1" },
  { text: "5%", discount: 5, color: "#96CEB4" },
  { text: "Không", discount: 0, color: "#FFEAA7" },
  { text: "100K", discount: 100000, color: "#DDA0DD" },
  { text: "15%", discount: 15, color: "#98D8C8" },
  { text: "Không", discount: 0, color: "#F7DC6F" },
];

export const RouletteGame = () => {
  const { canPlayGame, addVoucher, setGameAvailabilityState, gameAvailabilityState } = useVouchers();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleSpin = () => {
    if (!canPlayGame("roulette")) {
      toast.error("Bạn chưa thể chơi roulette!", {
        description: gameAvailabilityState.lastPlayedGameType === "roulette"
          ? "Bạn vừa chơi roulette rồi. Hãy thử scratch-off."
          : "Bạn cần hoàn thành ít nhất 1 chuyến để chơi.",
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
      const voucher = addVoucher({
        code: `ROULETTE${prize.discount}${Date.now()}`,
        wallet: "futapay",
        saving: prize.discount,
        label: typeof prize.discount === "number" && prize.discount < 100 
          ? `Giảm ${prize.discount}K - Roulette` 
          : `Giảm ${prize.discount}% - Roulette`,
        source: "roulette",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        gameMetadata: { gameType: "roulette" },
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
      lastPlayedGameType: "roulette",
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
        disabled={mustSpin || hasPlayed || !canPlayGame("roulette")}
        className="w-full bg-amber-600 text-white font-medium py-3 rounded-xl hover:bg-amber-700 transition-colors disabled:bg-amber-300 disabled:text-amber-600 disabled:cursor-not-allowed"
      >
        {mustSpin ? "Đang quay..." : hasPlayed ? "Đã hoàn thành" : "Quay ngay"}
      </button>

      {!canPlayGame("roulette") && !hasPlayed && (
        <p className="text-xs text-amber-600 mt-2 text-center">
          {gameAvailabilityState.lastPlayedGameType === "roulette"
            ? "Bạn vừa chơi roulette rồi. Hãy thử scratch-off."
            : "Bạn cần hoàn thành ít nhất 1 chuyến để chơi."}
        </p>
      )}
    </div>
  );
};
