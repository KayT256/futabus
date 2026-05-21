import { useState, useEffect } from "react";
import { useVouchers } from "@/contexts/VoucherContext";
import { getRandomQuestions, type QuizQuestion } from "@/data/quizQuestions";
import { toast } from "sonner";

export const DailyQuiz = () => {
  const { dailyQuizState, setDailyQuizState, canPlayDailyQuiz, addVoucher } = useVouchers();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!dailyQuizState.completed) {
      setQuestions(getRandomQuestions(10));
    }
  }, [dailyQuizState.completed]);

  const handleStartQuiz = () => {
    if (!canPlayDailyQuiz()) {
      toast.error("Bạn đã chơi quiz hôm nay rồi!", {
        description: "Quay lại vào ngày mai để chơi tiếp.",
      });
      return;
    }
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCompleted(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      setShowResult(true);
      setIsCompleted(true);
      
      // Calculate voucher
      let voucherDiscount = 0;
      if (score >= 10) {
        voucherDiscount = 15;
      } else if (score >= 8) {
        voucherDiscount = 10;
      }

      if (voucherDiscount > 0) {
        addVoucher({
          code: `QUIZ${voucherDiscount}${Date.now()}`,
          wallet: "futapay",
          saving: voucherDiscount,
          label: `Giảm ${voucherDiscount}% - Quiz hôm nay`,
          source: "daily_quiz",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          gameMetadata: { quizScore: score },
          discountType: "percentage",
        });

        toast.success("Chúc mừng!", {
          description: `Bạn đã nhận được voucher giảm ${voucherDiscount}% cho chuyến tiếp theo!`,
        });
      } else {
        toast.info("Quiz hoàn tất", {
          description: `Bạn đúng ${score}/10 câu. Cần đúng 8/10 để nhận voucher.`,
        });
      }

      // Save quiz state
      const today = new Date().toISOString().split("T")[0];
      setDailyQuizState({
        lastPlayedDate: today,
        score,
        completed: true,
      });
    }
  };

  const handleRestart = () => {
    if (!canPlayDailyQuiz()) {
      toast.error("Bạn đã chơi quiz hôm nay rồi!");
      return;
    }
    handleStartQuiz();
  };

  if (!canPlayDailyQuiz() && !dailyQuizState.completed) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-bold text-lg text-purple-900 mb-2">Quiz Du Lịch Việt Nam</h3>
          <p className="text-sm text-purple-700 mb-4">
            Trả lời 10 câu hỏi về các địa điểm du lịch Việt Nam để nhận voucher giảm giá!
          </p>
          <div className="bg-purple-100 rounded-lg p-3 mb-4">
            <p className="text-sm text-purple-800 font-medium">
              ⏰ Đã chơi hôm nay: {dailyQuizState.score}/10
            </p>
          </div>
          <button
            disabled
            className="w-full bg-purple-300 text-purple-600 font-medium py-3 rounded-xl cursor-not-allowed"
          >
            Đã hoàn thành hôm nay
          </button>
        </div>
      </div>
    );
  }

  if (dailyQuizState.completed && showResult) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="text-5xl mb-4">{score >= 8 ? "🎉" : "📝"}</div>
          <h3 className="font-bold text-xl text-purple-900 mb-2">Kết quả</h3>
          <p className="text-4xl font-bold text-purple-600 mb-4">
            {score}/10
          </p>
          <div className="bg-white rounded-lg p-4 mb-4">
            {score >= 10 ? (
              <p className="text-green-600 font-medium">
                🎁 Voucher giảm 15% cho chuyến tiếp theo!
              </p>
            ) : score >= 8 ? (
              <p className="text-blue-600 font-medium">
                🎁 Voucher giảm 10% cho chuyến tiếp theo!
              </p>
            ) : (
              <p className="text-gray-600">
                Cần đúng 8/10 để nhận voucher. Hãy thử lại vào ngày mai!
              </p>
            )}
          </div>
          <p className="text-sm text-purple-700 mb-4">
            Quay lại vào ngày mai để chơi tiếp
          </p>
          <button
            disabled={!canPlayDailyQuiz()}
            onClick={handleRestart}
            className="w-full bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:text-purple-600 disabled:cursor-not-allowed"
          >
            {canPlayDailyQuiz() ? "Chơi lại" : "Đã hoàn thành hôm nay"}
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-bold text-lg text-purple-900 mb-2">Quiz Du Lịch Việt Nam</h3>
          <p className="text-sm text-purple-700 mb-4">
            Trả lời 10 câu hỏi về các địa điểm du lịch Việt Nam để nhận voucher giảm giá!
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-white rounded-lg p-2">
              <p className="font-medium text-purple-900">8/10 đúng</p>
              <p className="text-purple-600">Giảm 10%</p>
            </div>
            <div className="bg-white rounded-lg p-2">
              <p className="font-medium text-purple-900">10/10 đúng</p>
              <p className="text-purple-600">Giảm 15%</p>
            </div>
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Bắt đầu Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-purple-900">
          Câu {currentQuestion + 1}/{questions.length}
        </div>
        <div className="text-sm font-medium text-purple-600">
          Điểm: {score}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <h3 className="font-medium text-slate-900 mb-4">{question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrectness = selectedAnswer !== null;

            let buttonClass =
              "w-full text-left p-3 rounded-lg border-2 transition-all";
            if (showCorrectness) {
              if (isCorrect) {
                buttonClass += " border-green-500 bg-green-50 text-green-900";
              } else if (isSelected && !isCorrect) {
                buttonClass += " border-red-500 bg-red-50 text-red-900";
              } else {
                buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              buttonClass += isSelected
                ? " border-purple-500 bg-purple-50 text-purple-900"
                : " border-gray-200 hover:border-purple-300 hover:bg-purple-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showCorrectness && isCorrect && <span className="text-green-600">✓</span>}
                  {showCorrectness && isSelected && !isCorrect && <span className="text-red-600">✗</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedAnswer !== null && question.explanation && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}

      <button
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        className="w-full bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:text-purple-600 disabled:cursor-not-allowed"
      >
        {currentQuestion < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
      </button>
    </div>
  );
};
