import type { Lecture } from "src/types/lecture.type";
import { videoUrls } from "src/videoUrls/videoUrls";

export const mockLecture: Lecture[] = [
  {
    id: "lecture-id-1",
    section_id: "sec-1",
    video_url: videoUrls.course_1.section_1.lecture_1,
    captions_url: "/captions/lecture-id-1.vtt",
    lecture_title: "1. Giao diện chung & trải nghiệm người dùng",
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
    lecture_title: "2. Tìm kiếm & Khám phá sản phẩm",
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
    lecture_title: "3. Trang chi tiết & tương tác sản phẩm",
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
    lecture_title: "1. Quản lý danh mục & sản phẩm",
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
    lecture_title: "2. Dashboard thống kê",
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
    lecture_title: "1. Giới thiệu File Storage Microservice",
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
    lecture_title: "1. Tổng quan Node.js",
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
    lecture_title: "2. Modules & Package Manager",
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
    lecture_title: "3. EventEmitter & Streams",
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
