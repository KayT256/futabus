import { useState } from "react";
import { useNavigate } from "react-router-dom";

const quickTags = [
  { id: 1, label: "Lái xe an toàn", emoji: "🛡️" },
  { id: 2, label: "Nhiệt tình", emoji: "😊" },
  { id: 3, label: "Đúng giờ", emoji: "⏰" },
  { id: 4, label: "Xe sạch sẽ", emoji: "✨" },
  { id: 5, label: "Thân thiện", emoji: "🤝" },
  { id: 6, label: "Giá tốt", emoji: "💰" },
  { id: 7, label: "Dịch vụ tốt", emoji: "⭐" },
  { id: 8, label: "Tiện nghi", emoji: "🚌" },
];

const emojiRatings = [
  { value: 1, emoji: "😠", label: "Rất không hài lòng" },
  { value: 2, emoji: "😕", label: "Không hài lòng" },
  { value: 3, emoji: "😐", label: "Bình thường" },
  { value: 4, emoji: "🙂", label: "Hài lòng" },
  { value: 5, emoji: "😍", label: "Rất hài lòng" },
];

export const PostTripFeedback = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    if (selectedRating) {
      setIsSubmitted(true);
      // Simulate submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <main className="text-sm bg-gray-100 box-border caret-transparent leading-5 min-h-screen flex items-center justify-center outline-[3px] w-full md:text-base md:leading-6">
        <div className="text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 outline-[3px] bg-white rounded-xl border border-gray-200 max-w-md mx-4 text-center md:text-base md:leading-6 p-8">
          <div className="text-sm box-border caret-transparent w-20 h-20 leading-5 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center outline-[3px] md:text-base md:leading-6">
            <svg
              className="text-sm box-border caret-transparent w-10 h-10 leading-5 outline-[3px] text-green-600 md:text-base md:leading-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-[15px] font-semibold box-border caret-transparent block leading-5 outline-[3px] text-black mb-2 md:text-base md:leading-6">
            Cảm ơn bạn!
          </h2>
          <p className="text-gray-600 text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:leading-6">
            Đánh giá của bạn đã được ghi nhận. Chúng tôi sẽ tiếp tục cải thiện dịch vụ.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="text-sm bg-gray-100 box-border caret-transparent leading-5 min-h-screen outline-[3px] w-full md:text-base md:leading-6">
      {/* Header */}
      <div className="text-white text-sm bg-[linear-gradient(rgb(241,100,57),rgb(242,117,78))] box-border caret-transparent flex h-14 items-center leading-5 outline-[3px] w-full md:text-neutral-900 md:bg-none md:leading-6">
        <div className="text-sm box-border caret-transparent flex items-center justify-between leading-5 max-w-[1128px] outline-[3px] mx-auto px-6 md:text-base md:leading-6">
          <button
            onClick={() => navigate('/')}
            className="text-white text-sm box-border caret-transparent flex items-center gap-2 leading-5 outline-[3px] md:text-neutral-900 md:leading-6"
          >
            <img
              src="https://futabus.vn/images/icons/back.svg"
              alt="back"
              className="text-white box-border caret-transparent leading-5 max-w-full outline-[3px] md:text-neutral-900 md:leading-6"
            />
            <span className="text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:leading-6">
              Đóng
            </span>
          </button>
          <span className="text-sm font-medium box-border caret-transparent leading-5 outline-[3px] text-orange-500 md:text-base md:leading-6">
            Đánh giá chuyến đi
          </span>
          <div className="text-sm box-border caret-transparent w-16 leading-5 outline-[3px] md:text-base md:leading-6" />
        </div>
      </div>

      <div className="text-sm box-border caret-transparent leading-5 max-w-[600px] outline-[3px] mx-auto pb-8 pt-6 px-6 md:text-base md:leading-6">
        {/* Trip Info */}
        <div className="text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full bg-white rounded-xl md:text-base md:leading-6 mb-6 p-4">
          <div className="text-sm box-border caret-transparent flex items-center justify-between leading-5 outline-[3px] md:text-base md:leading-6">
            <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">
              <p className="text-gray-500 text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:leading-6">Chuyến đi vừa hoàn thành</p>
              <p className="text-[15px] font-semibold box-border caret-transparent block leading-5 outline-[3px] text-black md:text-base md:leading-6">
                TP. Hồ Chí Minh - Bến xe Đà Lạt
              </p>
              <p className="text-gray-500 text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:leading-6">14/05/2026 - 23:30</p>
            </div>
            <div className="text-sm box-border caret-transparent w-16 h-16 leading-5 rounded-full bg-orange-100 flex items-center justify-center outline-[3px] md:text-base md:leading-6">
              <span className="text-2xl box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">🚌</span>
            </div>
          </div>
        </div>

        {/* Rating Question */}
        <div className="text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full bg-white rounded-xl md:text-base md:leading-6 mb-6 p-6">
          <h2 className="text-[15px] font-semibold box-border caret-transparent block leading-5 outline-[3px] text-black mb-2 text-center md:text-base md:leading-6">
            Bạn cảm thấy thế nào về chuyến đi này?
          </h2>
          <p className="text-gray-500 text-sm box-border caret-transparent block leading-5 outline-[3px] text-center mb-6 md:text-base md:leading-6">
            Chọn biểu tượng cảm xúc để đánh giá
          </p>

          <div className="text-sm box-border caret-transparent flex justify-center leading-5 outline-[3px] gap-4 mb-6 md:text-base md:leading-6">
            {emojiRatings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setSelectedRating(rating.value)}
                className={`text-sm box-border caret-transparent flex flex-col items-center gap-2 leading-5 outline-[3px] p-4 rounded-xl border-2 transition-all md:text-base md:leading-6 ${
                  selectedRating === rating.value
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <span className="text-4xl box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">{rating.emoji}</span>
                <span className="text-sm box-border caret-transparent leading-5 outline-[3px] text-gray-600 md:text-base md:leading-6">{rating.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Tags */}
        <div className="text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full bg-white rounded-xl md:text-base md:leading-6 mb-6 p-6">
          <h2 className="text-[15px] font-semibold box-border caret-transparent block leading-5 outline-[3px] text-black mb-4 md:text-base md:leading-6">
            Bạn thích điều gì nhất?
          </h2>
          <p className="text-gray-500 text-sm box-border caret-transparent block leading-5 outline-[3px] mb-4 md:text-base md:leading-6">
            Chọn tất cả những gì phù hợp (có thể chọn nhiều)
          </p>

          <div className="text-sm box-border caret-transparent flex flex-wrap leading-5 outline-[3px] gap-3 md:text-base md:leading-6">
            {quickTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`text-sm box-border caret-transparent flex items-center gap-2 leading-5 outline-[3px] px-4 py-3 rounded-full border-2 transition-all md:text-base md:leading-6 ${
                  selectedTags.includes(tag.id)
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <span className="text-xl box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">{tag.emoji}</span>
                <span className="text-sm font-medium box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment (Optional) */}
        <div className="text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full bg-white rounded-xl md:text-base md:leading-6 mb-6 p-6">
          <h2 className="text-[15px] font-semibold box-border caret-transparent block leading-5 outline-[3px] text-black mb-4 md:text-base md:leading-6">
            Góp thêm ý kiến (tùy chọn)
          </h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Chia sẻ thêm về trải nghiệm của bạn..."
            className="text-sm box-border caret-transparent w-full leading-5 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition resize-none outline-[3px] md:text-base md:leading-6"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedRating}
          className="text-sm box-border caret-transparent w-full leading-5 bg-orange-500 text-white font-medium py-4 rounded-full hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed outline-[3px] md:text-base md:leading-6"
        >
          Gửi đánh giá
        </button>

        {/* Skip Button */}
        <button
          onClick={() => navigate('/')}
          className="text-sm box-border caret-transparent w-full mt-3 leading-5 text-gray-500 font-medium py-2 hover:text-gray-700 transition outline-[3px] md:text-base md:leading-6"
        >
          Bỏ qua
        </button>
      </div>
    </main>
  );
};
