// Simulated passenger reviews for each driver.
// All data is generated deterministically from template pools so
// the file stays readable while producing ~350 realistic records.
//
// Sentiment classification mirrors the notebook pipeline:
//   5★ → positive, 4★ → positive (occasionally neutral),
//   3★ → neutral,  1-2★ → negative.
// Confidence score simulates a ViSoBERT-style output (0.70–0.99).

export type Sentiment = "positive" | "neutral" | "negative";

export interface Review {
  id: string;
  driverId: string;
  customer: string;
  avatarSeed: number;        // maps to pravatar.cc ?img=N
  rating: number;            // 1–5
  comment: string;
  tags: string[];
  date: string;              // "DD/MM/YYYY"
  sentiment: Sentiment;
  sentimentScore: number;    // 0–1 confidence
  helpfulCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Comment + tag template pools
// ─────────────────────────────────────────────────────────────────────────────

const POS_COMMENTS = [
  "Tài xế lái rất êm tay, cả chuyến đi thoải mái từ đầu đến cuối. Sẽ đặt lại lần sau!",
  "Xe sạch sẽ, điều hòa mát lạnh, tài xế thân thiện và nhiệt tình. Rất hài lòng!",
  "Chuyến đi đúng giờ, tài xế chuyên nghiệp, không phanh gấp hay nhấn còi ẩu.",
  "Tài xế rất nhiệt tình hỗ trợ hành lý, hướng dẫn chỗ ngồi rõ ràng. Cảm ơn anh!",
  "Lái xe an toàn, ổn định dù đường đèo dốc. Yên tâm ngủ suốt đêm.",
  "Tuyệt vời! Xe mới, ghế limousine thoải mái, tài xế lịch sự và chuyên nghiệp.",
  "Đúng giờ, thái độ tốt, xe sạch. Đây là lần thứ 5 mình đi FUTA và luôn hài lòng.",
  "Tài xế vui vẻ, cho dừng nghỉ đúng lúc, phân công chỗ ngồi hợp lý. Rất OK!",
  "Chuyến đi êm ái, không bị say xe dù đường đèo. Tài xế lái chắc tay, cảm ơn!",
  "Xe đến đúng giờ, tài xế thân thiện. Sẽ tiếp tục ủng hộ FUTA Bus Lines!",
  "Ghế rộng rãi, điều hòa hoạt động tốt, tài xế không hút thuốc trên xe. 5 sao xứng đáng!",
  "Tài xế thông báo trước các điểm dừng rất rõ ràng. Dịch vụ chuyên nghiệp.",
  "Đây là lần đầu mình đi FUTA và ấn tượng tốt ngay. Tài xế nhiệt tình, xe tốt.",
  "Chuyến đi thuận tiện, không bị trễ, tài xế không nói chuyện điện thoại khi lái.",
  "Hành lý được xếp cẩn thận, không bị lẫn lộn. Tài xế chu đáo và có trách nhiệm.",
  "Tài xế nhắc nhở hành khách thắt dây an toàn, rất có ý thức an toàn giao thông.",
  "Mình mang theo em bé, tài xế rất thông cảm và tạo điều kiện. Cảm ơn rất nhiều!",
  "Xe 34 chỗ limousine xịn, chuyến đi êm hơn xe khách thường nhiều. Đáng tiền!",
  "Tài xế lái cẩn thận qua đoạn đường công trình đang sửa chữa. Rất an toàn.",
  "Dịch vụ tốt, đặt vé dễ, xe đến đúng điểm hẹn. Mình rất hài lòng.",
  "Tài xế nhường đường cho xe cứu thương, có ý thức giao thông cao. Đáng khen!",
  "Xe có wifi, điều hòa mát, tài xế thân thiện. Mình ngủ ngon suốt hành trình.",
  "Chuyến Sài Gòn–Đà Lạt êm ái nhất từ trước tới nay. Tài xế lái cực kỳ chuyên nghiệp.",
  "Tài xế dừng thêm cho khách xuống toilet mà không phàn nàn. Rất nhiệt tình!",
  "Xe sạch bóng, không có mùi, ghế mới, điều hòa tốt. Chuyến đi hoàn hảo.",
  "Tài xế đi đúng giờ, không chờ thêm quá 10 phút như một số hãng khác.",
  "Mình bị say xe nhẹ, tài xế giảm tốc độ và mở thêm gió. Rất chu đáo!",
  "Hành lý 25kg được phục vụ tận tình, không tính thêm phí. Cảm ơn FUTA!",
  "Tài xế có kinh nghiệm, biết đường tắt tránh kẹt xe, về đúng giờ.",
  "Phục vụ tốt từ điểm đón đến nơi đến. Sẽ giới thiệu cho bạn bè.",
];

const NEU_COMMENTS = [
  "Chuyến đi tương đối ổn, không có gì đặc biệt để khen hay chê. Xe bình thường.",
  "Tài xế bình thường, không nhiệt tình lắm nhưng cũng không gây khó chịu.",
  "Xe đến hơi trễ khoảng 15 phút nhưng hành trình thì bình thường.",
  "Dịch vụ ở mức chấp nhận được. Ghế hơi chật so với quảng cáo.",
  "Chuyến đi ổn, tài xế không nói nhiều, làm đúng việc. Không có gì nổi bật.",
  "Xe có mùi hơi khó chịu ở đầu chuyến nhưng sau đó hết. Nói chung ổn.",
  "Tài xế lái ổn định, không quá nhanh cũng không quá chậm. Chuyến đi bình thường.",
  "Điều hòa đôi khi hơi lạnh, nhưng được trang bị chăn. Tạm chấp nhận.",
  "Dừng nghỉ đúng lịch, nhưng điểm dừng không có nhiều tiện nghi lắm.",
  "Không có gì đặc biệt, chuyến đi bình thường như các lần trước.",
];

const NEG_COMMENTS = [
  "Xe đến trễ hơn 45 phút so với lịch mà không có thông báo nào trước cả.",
  "Tài xế lái ẩu, phanh gấp liên tục, cả đêm không ngủ được vì bị giật.",
  "Điều hòa bị hỏng từ nửa hành trình, rất bức bí và nóng nực suốt đêm.",
  "Thái độ tài xế khá thô lỗ khi hành khách hỏi về giờ đến. Cần cải thiện.",
  "Xe cũ, ghế bị lệch, mùi ẩm mốc. Không xứng với giá tiền đã trả.",
  "Tài xế hút thuốc trong xe khi khách đang ngủ. Rất khó chịu và thiếu tôn trọng.",
  "Xe chạy quá tốc độ trên đường cao tốc, cảm thấy không an toàn chút nào.",
  "Hành lý của tôi bị xếp lẫn với hàng hóa, móp méo khi lấy ra. Thiếu cẩn thận.",
  "Xe dừng thêm nhiều điểm không có trong lịch trình, đến muộn hơn 1 tiếng.",
  "Điểm đón sai với thông tin đặt vé, phải tự di chuyển thêm mà không được hỗ trợ.",
  "Tài xế nói chuyện điện thoại không rảnh tay suốt hành trình. Rất nguy hiểm!",
  "Ghế số tôi đặt bị người khác ngồi, tài xế không giải quyết được. Khó chịu.",
  "Xe không có wifi dù quảng cáo có. Điều hòa yếu không làm lạnh được.",
  "Tài xế nhường hành khách mới lên xe nhưng không chú ý đến hành khách cũ.",
  "Chuyến đi trễ 30 phút, không có lời xin lỗi nào từ tài xế hay nhân viên.",
];

const POS_TAGS_POOL = [
  ["Lái xe an toàn", "Đúng giờ"],
  ["Nhiệt tình", "Thân thiện"],
  ["Xe sạch sẽ", "Điều hòa tốt"],
  ["Chuyên nghiệp", "Đúng giờ"],
  ["Hỗ trợ hành lý", "Nhiệt tình"],
  ["Lái xe an toàn", "Thân thiện"],
  ["Xe sạch sẽ", "Chuyên nghiệp"],
  ["Đúng giờ", "Lái xe an toàn", "Nhiệt tình"],
  ["Thân thiện", "Xe sạch sẽ"],
  ["Chu đáo", "Lái xe an toàn"],
];

const NEU_TAGS_POOL = [
  ["Đúng giờ", "Lái xe an toàn"],
  ["Phục vụ tốt"],
  ["Xe sạch sẽ"],
  ["Lái xe an toàn"],
];

const NEG_TAGS_POOL = [
  ["Đến trễ", "Không thông báo"],
  ["Lái xe không an toàn"],
  ["Thái độ không tốt"],
  ["Xe cũ", "Điều hòa hỏng"],
  ["Hành lý bị hỏng"],
  ["Lái xe ẩu", "Nguy hiểm"],
];

const CUSTOMER_NAMES = [
  "Nguyễn Thị Lan", "Trần Văn Hùng", "Lê Thị Mai", "Phạm Văn Đức",
  "Hoàng Thị Ngọc", "Vũ Minh Tú", "Đặng Thu Hằng", "Bùi Văn Khoa",
  "Đinh Thị Phương", "Ngô Thanh Nam", "Phan Thị Linh", "Trương Văn Bảo",
  "Đỗ Hữu Toàn", "Lương Thị Hoa", "Tô Minh Quân", "Hà Thị Thu",
  "Đào Văn Long", "Lâm Thị Cẩm", "Cao Anh Tuấn", "Kiều Thị Nhung",
  "Mạc Văn Thịnh", "Phùng Thị Yến", "Dương Quang Hải", "Lưu Thị Bích",
  "Triệu Văn Dũng", "Bạch Thị Loan", "Chu Minh Hiếu", "Tạ Thị Duyên",
  "Giang Văn Tùng", "Huỳnh Thị Kim", "Mai Anh Vũ", "Trịnh Thị Hạnh",
  "Võ Thanh Tâm", "Dương Văn Phúc", "Lê Hoàng Sơn", "Nguyễn Minh Châu",
  "Phạm Thị Diễm", "Trần Quốc Bình", "Hồ Thị Giang", "Lý Văn Phát",
  "Nông Thị Sen", "Lục Văn Thắng", "Đới Thị Nhi", "Trần Thị Thúy",
  "Bùi Hoàng Long", "Nguyễn Thị Thủy", "Vương Minh Khoa", "Phan Văn Đạt",
  "Đặng Thị Huyền", "Lê Quang Trung",
];

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic seeded generator (no Math.random() so output is stable).
// ─────────────────────────────────────────────────────────────────────────────

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function dateInRange(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// Rating distribution per driver crewScore band:
//   excellent (4.8-4.9): 75% 5★, 15% 4★, 7% 3★, 2% 2★, 1% 1★
//   good      (4.6-4.7): 60% 5★, 20% 4★, 12% 3★, 5% 2★, 3% 1★
//   average   (4.4-4.5): 48% 5★, 22% 4★, 17% 3★, 8% 2★, 5% 1★
function pickRating(crewScore: number, rand: () => number): number {
  const r = rand();
  if (crewScore >= 4.8) {
    if (r < 0.75) return 5;
    if (r < 0.90) return 4;
    if (r < 0.97) return 3;
    if (r < 0.99) return 2;
    return 1;
  } else if (crewScore >= 4.6) {
    if (r < 0.60) return 5;
    if (r < 0.80) return 4;
    if (r < 0.92) return 3;
    if (r < 0.97) return 2;
    return 1;
  } else {
    if (r < 0.48) return 5;
    if (r < 0.70) return 4;
    if (r < 0.87) return 3;
    if (r < 0.95) return 2;
    return 1;
  }
}

function classifySentiment(rating: number, rand: () => number): { sentiment: Sentiment; score: number } {
  if (rating === 5) return { sentiment: "positive", score: 0.85 + rand() * 0.14 };
  if (rating === 4) {
    const r = rand();
    return r < 0.80
      ? { sentiment: "positive", score: 0.70 + rand() * 0.20 }
      : { sentiment: "neutral",  score: 0.60 + rand() * 0.20 };
  }
  if (rating === 3) {
    const r = rand();
    if (r < 0.60) return { sentiment: "neutral",  score: 0.65 + rand() * 0.20 };
    if (r < 0.85) return { sentiment: "negative", score: 0.60 + rand() * 0.20 };
    return { sentiment: "positive", score: 0.55 + rand() * 0.15 };
  }
  // 1-2 stars
  return { sentiment: "negative", score: 0.78 + rand() * 0.21 };
}

// Driver profiles used by the generator.
const DRIVER_PROFILES = [
  { id: "TX001", crewScore: 4.9, count: 95 },
  { id: "TX002", crewScore: 4.8, count: 80 },
  { id: "TX003", crewScore: 4.7, count: 65 },
  { id: "TX004", crewScore: 4.6, count: 50 },
  { id: "TX005", crewScore: 4.5, count: 35 },
  { id: "TX006", crewScore: 4.4, count: 25 },
];

function generateReviews(): Review[] {
  const reviews: Review[] = [];
  let globalId = 1;

  for (const profile of DRIVER_PROFILES) {
    const rand = seededRandom(parseInt(profile.id.slice(2)) * 31337);
    const usedNames = new Set<string>();

    for (let i = 0; i < profile.count; i++) {
      const rating = pickRating(profile.crewScore, rand);
      const { sentiment, score } = classifySentiment(rating, rand);

      let comment: string;
      let tags: string[];
      if (sentiment === "positive") {
        comment = pick(POS_COMMENTS, rand);
        tags   = pick(POS_TAGS_POOL, rand);
      } else if (sentiment === "neutral") {
        comment = pick(NEU_COMMENTS, rand);
        tags   = pick(NEU_TAGS_POOL, rand);
      } else {
        comment = pick(NEG_COMMENTS, rand);
        tags   = pick(NEG_TAGS_POOL, rand);
      }

      // Pick a unique customer name per driver (cycle names if needed).
      let customer = pick(CUSTOMER_NAMES, rand);
      let tries = 0;
      while (usedNames.has(customer) && tries < 20) {
        customer = pick(CUSTOMER_NAMES, rand);
        tries++;
      }
      usedNames.add(customer);

      // Spread dates across last 180 days.
      const daysAgo = Math.floor(rand() * 180);
      const avatarSeed = 1 + Math.floor(rand() * 99);
      const helpfulCount = Math.floor(rand() * 40);

      reviews.push({
        id: `R${String(globalId++).padStart(4, "0")}`,
        driverId: profile.id,
        customer,
        avatarSeed,
        rating,
        comment,
        tags,
        date: dateInRange(daysAgo),
        sentiment,
        sentimentScore: parseFloat(score.toFixed(3)),
        helpfulCount,
      });
    }
  }

  return reviews;
}

export const ALL_REVIEWS: Review[] = generateReviews();

export const getDriverReviews = (driverId: string): Review[] =>
  ALL_REVIEWS.filter((r) => r.driverId === driverId);
