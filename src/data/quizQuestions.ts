// 30 questions about Vietnam travel locations for the daily quiz
// Each question has 4 options, with the correct answer index (0-3)

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Đà Lạt nằm ở tỉnh nào?",
    options: ["Lâm Đồng", "Đắk Lắk", "Gia Lai", "Kon Tum"],
    correctAnswer: 0,
    explanation: "Đà Lạt là thành phố thuộc tỉnh Lâm Đồng, nằm trên cao nguyên Lâm Viên.",
  },
  {
    id: "q2",
    question: "Vịnh Hạ Long thuộc tỉnh nào?",
    options: ["Quảng Ninh", "Hải Phòng", "Hà Giang", "Cao Bằng"],
    correctAnswer: 0,
    explanation: "Vịnh Hạ Long nằm ở tỉnh Quảng Ninh, được UNESCO công nhận là di sản thiên nhiên thế giới.",
  },
  {
    id: "q3",
    question: "Phố cổ Hội An nằm ở tỉnh nào?",
    options: ["Quảng Nam", "Quảng Ngãi", "Thừa Thiên Huế", "Đà Nẵng"],
    correctAnswer: 0,
    explanation: "Phố cổ Hội An thuộc tỉnh Quảng Nam, là đô thị cổ được bảo tồn tốt nhất Đông Nam Á.",
  },
  {
    id: "q4",
    question: "Đỉnh Fansipan cao nhất Việt Nam nằm ở đâu?",
    options: ["Lào Cai", "Lai Châu", "Điện Biên", "Sơn La"],
    correctAnswer: 0,
    explanation: "Đỉnh Fansipan (3.143m) nằm ở thị xã Sa Pa, tỉnh Lào Cai, được gọi là nóc nhà Đông Dương.",
  },
  {
    id: "q5",
    question: "Hang Sơn Đoòng là hang động lớn nhất thế giới nằm ở đâu?",
    options: ["Quảng Bình", "Quảng Trị", "Thừa Thiên Huế", "Đà Nẵng"],
    correctAnswer: 0,
    explanation: "Hang Sơn Đoòng nằm ở Vườn Quốc gia Phong Nha - Kẻ Bàng, tỉnh Quảng Bình.",
  },
  {
    id: "q6",
    question: "Cố đô Huế từng là thủ đô của triều đại nào?",
    options: ["Nhà Nguyễn", "Nhà Trần", "Nhà Lê", "Nhà Hậu Lý"],
    correctAnswer: 0,
    explanation: "Huế là cố đô của triều đại Nhà Nguyễn (1802-1945), với Kinh thành Huế nổi tiếng.",
  },
  {
    id: "q7",
    question: "Đảo Phú Quốc thuộc tỉnh nào?",
    options: ["Kiên Giang", "Cần Thơ", "An Giang", "Tiền Giang"],
    correctAnswer: 0,
    explanation: "Đảo Phú Quốc là huyện đảo lớn nhất Việt Nam, thuộc tỉnh Kiên Giang.",
  },
  {
    id: "q8",
    question: "Cầu Rồng Đà Nẵng được xây dựng vào năm nào?",
    options: ["2013", "2010", "2015", "2008"],
    correctAnswer: 0,
    explanation: "Cầu Rồng Đà Nẵng khánh thành năm 2013, là cầu có kết cấu thép độc nhất tại Việt Nam.",
  },
  {
    id: "q9",
    question: "Vườn quốc gia Cúc Phương nằm ở tỉnh nào?",
    options: ["Ninh Bình", "Thanh Hóa", "Hòa Bình", "Nghệ An"],
    correctAnswer: 0,
    explanation: "Vườn quốc gia Cúc Phương ở Ninh Bình là vườn quốc gia đầu tiên của Việt Nam.",
  },
  {
    id: "q10",
    question: "Thác Bản Giốc là thác nước lớn nhất Việt Nam nằm ở đâu?",
    options: ["Cao Bằng", "Lạng Sơn", "Hà Giang", "Tuyên Quang"],
    correctAnswer: 0,
    explanation: "Thác Bản Giốc ở huyện Trùng Khánh, tỉnh Cao Bằng, là thác nước lớn nhất Việt Nam.",
  },
  {
    id: "q11",
    question: "Chùa Một Cột ở Hà Nội được xây dựng vào năm nào?",
    options: ["1049", "1010", "1050", "1009"],
    correctAnswer: 0,
    explanation: "Chùa Một Cột (Diên Hựu Tự) được xây dựng năm 1049 dưới thời vua Lý Thái Tông.",
  },
  {
    id: "q12",
    question: "Đầm nướng Mũi Né nằm ở tỉnh nào?",
    options: ["Bình Thuận", "Ninh Thuận", "Bà Rịa - Vũng Tàu", "Khánh Hòa"],
    correctAnswer: 0,
    explanation: "Mũi Né là phường thuộc thành phố Phan Thiết, tỉnh Bình Thuận, nổi tiếng với đầm nướng.",
  },
  {
    id: "q13",
    question: "Vườn quốc gia Yok Đôn nằm ở tỉnh nào?",
    options: ["Đắk Lắk", "Đắk Nông", "Gia Lai", "Kon Tum"],
    correctAnswer: 0,
    explanation: "Vườn quốc gia Yok Đôn ở Đắk Lắk là vườn quốc gia lớn nhất Việt Nam.",
  },
  {
    id: "q14",
    question: "Cột cờ Lũng Cú nằm ở đâu?",
    options: ["Hà Giang", "Lào Cai", "Điện Biên", "Lai Châu"],
    correctAnswer: 0,
    explanation: "Cột cờ Lũng Cú ở huyện Đồng Văn, Hà Giang là điểm cực Bắc của Việt Nam.",
  },
  {
    id: "q15",
    question: "Bãi biển Nha Trang thuộc tỉnh nào?",
    options: ["Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Phú Yên"],
    correctAnswer: 0,
    explanation: "Nha Trang là thành phố biển thuộc tỉnh Khánh Hòa, nổi tiếng với vịnh Nha Trang đẹp.",
  },
  {
    id: "q16",
    question: "Đền Hùng ở Phú Thọ được xây dựng để tưởng nhớ ai?",
    options: ["Vua Hùng", "Vua Lý", "Vua Trần", "Vua Lê"],
    correctAnswer: 0,
    explanation: "Đền Hùng ở Phú Thọ là nơi thờ cúng các Vua Hùng, founders của dân tộc Việt Nam.",
  },
  {
    id: "q17",
    question: "Thánh địa Mỹ Sơn nằm ở tỉnh nào?",
    options: ["Quảng Nam", "Quảng Ngãi", "Thừa Thiên Huế", "Đà Nẵng"],
    correctAnswer: 0,
    explanation: "Thánh địa Mỹ Sơn ở Quảng Nam là quần thể đền tháp Chăm cổ kính, được UNESCO công nhận.",
  },
  {
    id: "q18",
    question: "Đảo Côn Đảo thuộc tỉnh nào?",
    options: ["Bà Rịa - Vũng Tàu", "Tiền Giang", "Trà Vinh", "Sóc Trăng"],
    correctAnswer: 0,
    explanation: "Đảo Côn Đảo là huyện đảo thuộc tỉnh Bà Rịa - Vũng Tàu, nổi tiếng với lịch sử nhà tù.",
  },
  {
    id: "q19",
    question: "Cầu tình yêu Đà Lạt được xây dựng vào năm nào?",
    options: ["1998", "2000", "1990", "2005"],
    correctAnswer: 0,
    explanation: "Cầu tình yêu Đà Lạt được xây dựng năm 1998, là biểu tượng lãng mạn của thành phố.",
  },
  {
    id: "q20",
    question: "Vườn quốc gia Phong Nha - Kẻ Bàng nằm ở tỉnh nào?",
    options: ["Quảng Bình", "Quảng Trị", "Hà Tĩnh", "Nghệ An"],
    correctAnswer: 0,
    explanation: "Vườn quốc gia Phong Nha - Kẻ Bàng ở Quảng Bình có hệ thống hang động kỳ vĩ nhất thế giới.",
  },
  {
    id: "q21",
    question: "Tháp Chàm Po Nagar ở Nha Trang thờ ai?",
    options: ["Thiên Y A Na", "Po Klong Garai", "Po Rome", "Po Klaung Garai"],
    correctAnswer: 0,
    explanation: "Tháp Chàm Po Nagar thờ nữ thần Thiên Y A Na, người sáng lập vương quốc Chăm-pa.",
  },
  {
    id: "q22",
    question: "Khu du lịch Tam Đảo nằm ở tỉnh nào?",
    options: ["Vĩnh Phúc", "Thái Nguyên", "Bắc Giang", "Hà Nội"],
    correctAnswer: 0,
    explanation: "Tam Đảo là thị xã thuộc tỉnh Vĩnh Phúc, là khu du lịch nghỉ dưỡng nổi tiếng miền Bắc.",
  },
  {
    id: "q23",
    question: "Động Phong Nha là hang động nổi tiếng nằm ở đâu?",
    options: ["Quảng Bình", "Quảng Trị", "Thừa Thiên Huế", "Đà Nẵng"],
    correctAnswer: 0,
    explanation: "Động Phong Nha ở Quảng Bình là hang động có sông ngầm dài nhất Việt Nam.",
  },
  {
    id: "q24",
    question: "Bãi biển Vũng Tàu nằm ở tỉnh nào?",
    options: ["Bà Rịa - Vũng Tàu", "Tiền Giang", "Long An", "Đồng Nai"],
    correctAnswer: 0,
    explanation: "Vũng Tàu là thành phố thuộc tỉnh Bà Rịa - Vũng Tàu, là bãi biển nổi tiếng gần TP.HCM.",
  },
  {
    id: "q25",
    question: "Đỉnh Bạch Mã thuộc dãy núi nào?",
    options: ["Dãy Bạch Mã", "Dãy Hoàng Liên Sơn", "Dãy Trường Sơn", "Dãy Kon Tum"],
    correctAnswer: 0,
    explanation: "Đỉnh Bạch Mã (1.458m) thuộc dãy Bạch Mã ở tỉnh Thừa Thiên Huế, là đỉnh núi nổi tiếng.",
  },
  {
    id: "q26",
    question: "Khu du lịch Sapa nằm ở tỉnh nào?",
    options: ["Lào Cai", "Lai Châu", "Điện Biên", "Sơn La"],
    correctAnswer: 0,
    explanation: "Sa Pa là thị xã thuộc tỉnh Lào Cai, là khu du lịch nổi tiếng với ruộng bậc thang.",
  },
  {
    id: "q27",
    question: "Vịnh Nha Trang có bao nhiêu hòn đảo lớn nhỏ?",
    options: ["19", "15", "20", "25"],
    correctAnswer: 0,
    explanation: "Vịnh Nha Trang có 19 hòn đảo lớn nhỏ, với những bãi biển đẹp và san hô tuyệt đẹp.",
  },
  {
    id: "q28",
    question: "Khu du lịch Ba Vì nằm ở tỉnh nào?",
    options: ["Hà Nội", "Hòa Bình", "Phú Thọ", "Vĩnh Phúc"],
    correctAnswer: 0,
    explanation: "Vườn quốc gia Ba Vì ở Hà Nội là khu du lịch nổi tiếng với rừng nguyên sinh.",
  },
  {
    id: "q29",
    question: "Thác Dambri ở Đà Lạt được xây dựng vào năm nào?",
    options: ["1990", "1985", "1995", "2000"],
    correctAnswer: 0,
    explanation: "Thác Dambri ở Đà Lạt được xây dựng năm 1990, là thác nước lớn nhất tỉnh Lâm Đồng.",
  },
  {
    id: "q30",
    question: "Đền Trần ở Nam Định thờ ai?",
    options: ["Vua Trần", "Vua Hùng", "Vua Lý", "Vua Lê"],
    correctAnswer: 0,
    explanation: "Đền Trần ở Nam Định thờ 14 vua Trần, là nơi tưởng niệm triều đại Trần hùng mạnh.",
  },
];

// Get 10 random questions from the 30-question bank
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
