import { useState } from "react";
import { useVouchers } from "@/contexts/VoucherContext";
import { toast } from "sonner";

// Prize pool for scratch-off
const PRIZES = [
  { text: "10%", discount: 10, probability: 0.15 },
  { text: "Không", discount: 0, probability: 0.35 },
  { text: "50K", discount: 50000, probability: 0.15 },
  { text: "5%", discount: 5, probability: 0.10 },
  { text: "Không", discount: 0, probability: 0.20 },
  { text: "100K", discount: 100000, probability: 0.05 },
];

export const ScratchOffGame = () => {
  const { canPlayGame, addVoucher, setGameAvailabilityState, gameAvailabilityState } = useVouchers();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [prize, setPrize] = useState<typeof PRIZES[0] | null>(null);

  const handleScratch = () => {
    if (!canPlayGame("scratch_off")) {
      toast.error("Bạn chưa thể chơi scratch-off!", {
        description: gameAvailabilityState.lastPlayedGameType === "scratch_off"
          ? "Bạn vừa chơi scratch-off rồi. Hãy thử roulette."
          : "Bạn cần hoàn thành ít nhất 1 chuyến để chơi.",
      });
      return;
    }

    // Randomly select prize based on probability
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedPrize = PRIZES[0];

    for (const p of PRIZES) {
      cumulativeProbability += p.probability;
      if (random <= cumulativeProbability) {
        selectedPrize = p;
        break;
      }
    }

    setPrize(selectedPrize);
    setIsRevealed(true);
    setHasPlayed(true);

    if (selectedPrize.discount > 0) {
      const voucher = addVoucher({
        code: `SCRATCH${selectedPrize.discount}${Date.now()}`,
        wallet: "futapay",
        saving: selectedPrize.discount,
        label: typeof selectedPrize.discount === "number" && selectedPrize.discount < 100
          ? `Giảm ${selectedPrize.discount}K - Scratch-off`
          : `Giảm ${selectedPrize.discount}% - Scratch-off`,
        source: "scratch_off",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        gameMetadata: { gameType: "scratch_off" },
      });

      toast.success("Chúc mừng!", {
        description: `Bạn đã nhận được voucher ${selectedPrize.text}!`,
      });
    } else {
      toast.info("Rất tiếc!", {
        description: "Bạn chưa nhận được giải thưởng lần này. Hãy thử lại sau!",
      });
    }

    // Update game availability state
    const today = new Date().toISOString().split("T")[0];
    setGameAvailabilityState({
      lastPlayedGameType: "scratch_off",
      lastPlayedDate: today,
      tripsSinceLastPlay: 0,
    });
  };

  const handleReset = () => {
    setIsRevealed(false);
    setHasPlayed(false);
    setPrize(null);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎫</div>
        <h3 className="font-bold text-lg text-rose-900 mb-2">Vé Cào May Mắn</h3>
        <p className="text-sm text-rose-700">
          Cào vé để nhận voucher giảm giá!
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-rose-300">
        {!isRevealed ? (
          <div className="text-center">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-sm text-rose-600 mb-4">
              Cào để biết giải thưởng của bạn
            </p>
            <button
              onClick={handleScratch}
              disabled={!canPlayGame("scratch_off")}
              className="bg-rose-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-rose-700 transition-colors disabled:bg-rose-300 disabled:text-rose-600 disabled:cursor-not-allowed"
            >
              Cào ngay
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">
              {prize && prize.discount > 0 ? "🎉" : "😔"}
            </div>
            <p className="text-2xl font-bold text-rose-900 mb-2">
              {prize?.text}
            </p>
            <p className="text-sm text-rose-600 mb-4">
              {prize && prize.discount > 0
                ? "Chúc mừng bạn đã nhận được voucher!"
                : "Rất tiếc, hãy thử lại sau!"}
            </p>
            {hasPlayed && canPlayGame("scratch_off") && (
              <button
                onClick={handleReset}
                className="bg-rose-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors text-sm"
              >
                Chơi lại
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
        {PRIZES.map((prize, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-2 text-center"
          >
            <p className="font-medium text-rose-900">{prize.text}</p>
            <p className="text-rose-600">{Math.round(prize.probability * 100)}%</p>
          </div>
        ))}
      </div>

      {!canPlayGame("scratch_off") && !hasPlayed && (
        <p className="text-xs text-rose-600 mt-2 text-center">
          {gameAvailabilityState.lastPlayedGameType === "scratch_off"
            ? "Bạn vừa chơi scratch-off rồi. Hãy thử roulette."
            : "Bạn cần hoàn thành ít nhất 1 chuyến để chơi."}
        </p>
      )}
    </div>
  );
};
