import type { Lecture } from "src/types/lecture.type";
import { videoUrls } from "src/videoUrls/videoUrls";

export const mockLecture: Lecture[] = [
  {
    id: "lecture-id-1",
    section_id: "sec-1",
    video_url: videoUrls.course_1.section_1.lecture_1,
    captions_url: "/captions/lecture-id-1.vtt",
    lecture_title: "I. Giao diện chung & trải nghiệm người dùng",
    position_in_section: 1,
    duration: 20,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn`,
  },
  {
    id: "lv-2",
    section_id: "sec-1",
    video_url: "https://video-platform.com/video2.mp4",
    lecture_title: "II. Tìm kiếm & Khám phá sản phẩm",
    position_in_section: 2,
    duration: 25,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-3",
    section_id: "sec-1",
    video_url: "https://video-platform.com/video3.mp4",
    lecture_title: "III. Trang chi tiết & tương tác sản phẩm",
    position_in_section: 3,
    duration: 30,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-4",
    section_id: "sec-2",
    video_url: "https://video-platform.com/video4.mp4",
    lecture_title: "I. Quản lý danh mục & sản phẩm",
    position_in_section: 1,
    duration: 18,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-5",
    section_id: "sec-2",
    video_url: "https://video-platform.com/video5.mp4",
    lecture_title: "II. Dashboard thống kê",
    position_in_section: 2,
    duration: 15,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-6",
    section_id: "sec-3",
    video_url: "https://video-platform.com/video6.mp4",
    lecture_title: "I. Giới thiệu File Storage Microservice",
    position_in_section: 1,
    duration: 22,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-7",
    section_id: "sec-3",
    video_url: "https://video-platform.com/video7.mp4",
    lecture_title: "II. Tích hợp dịch vụ lưu trữ",
    position_in_section: 2,
    duration: 28,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-8",
    section_id: "sec-4",
    video_url: "https://video-platform.com/video8.mp4",
    lecture_title: "I. Tổng quan Node.js",
    position_in_section: 1,
    duration: 30,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-9",
    section_id: "sec-4",
    video_url: "https://video-platform.com/video9.mp4",
    lecture_title: "II. Modules & Package Manager",
    position_in_section: 2,
    duration: 20,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
  {
    id: "lv-10",
    section_id: "sec-4",
    video_url: "https://video-platform.com/video10.mp4",
    lecture_title: "III. EventEmitter & Streams",
    position_in_section: 3,
    duration: 25,
    lesson: [
      "Trang chủ linh hoạt, thay đổi banner/nội dung dễ dàng từ admin",
      "Tích hợp đa ngôn ngữ",
      "Hỗ trợ chat trực tuyến với khách hàng",
      "Giao diện responsive trên mọi thiết bị",
      "Đăng ký/Đăng nhập JWT + Email",
      "Đăng nhập Google/Facebook",
      "Quên mật khẩu, đặt lại qua email",
    ],
    transcript: `Transcript cho bài giảng này.

Phần mở đầu: Giới thiệu tổng quan về nội dung bài học.

Phần chính: Trình bày chi tiết từng khía cạnh, ví dụ cụ thể liên quan đến bài học.

Tổng kết: Tóm tắt lại các điểm chính, đưa ra lời khuyên và ứng dụng thực tiễn.`,
  },
];
