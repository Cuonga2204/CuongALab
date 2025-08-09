import type { Course } from "src/types/course.type";

export const mockCourses: Course[] = [
  {
    id: "course_1",
    author_id: "teacher_01",
    title: "Kiến Thức Nhập Môn IT",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 1000000,
    price_current: 5000000,
    name_teacher: "Cường Á",
    rating_average: 4.8,
    overview: "Kiến thức nền tảng cho người mới học IT.",
    description:
      "Khóa học cung cấp kiến thức cơ bản về phần cứng, phần mềm, mạng máy tính giúp bạn có nền tảng vững chắc trước khi học lập trình.",
    status: "published",
    student_count: 135580,
    total_sections: 5,
    total_lectures: 30,
    total_video_duration: 180,
    total_hours: 3, // 180 phút = 3h
    category: "1", // Khóa học cơ bản
  },
  {
    id: "course_2",
    author_id: "teacher_02",
    title: "Cơ Sở Dữ Liệu & SQL",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 2000000,
    price_current: 1000000,
    name_teacher: "Đào Sỹ Mạnh",
    rating_average: 4.7,
    overview: "Hiểu rõ cách thiết kế database, tối ưu truy vấn SQL.",
    description:
      "Khóa học cung cấp kiến thức nền tảng về cơ sở dữ liệu quan hệ, MySQL, PostgreSQL và các kỹ thuật tối ưu hiệu suất truy vấn.",
    status: "published",
    student_count: 50500,
    total_sections: 4,
    total_lectures: 24,
    total_video_duration: 120,
    total_hours: 2, // 120 phút = 2h
    category: "1", // Khóa học cơ bản
  },

  // ✅ FRONTEND COURSES
  {
    id: "course_3",
    author_id: "teacher_03",
    title: "HTML CSS từ Zero đến Hero",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 5000000,
    price_current: 10000000,
    name_teacher: "Vinh Tỷ",
    rating_average: 4.9,
    overview: "Học HTML, CSS từ cơ bản đến nâng cao.",
    description:
      "Khóa học nền tảng về xây dựng giao diện web với HTML, CSS, Responsive Design, Flexbox, Grid.",
    status: "published",
    student_count: 212370,
    total_sections: 8,
    total_lectures: 95,
    total_video_duration: 420,
    total_hours: 7,
    category: "2",
  },
  {
    id: "course_4",
    author_id: "teacher_03",
    title: "JavaScript Cơ Bản",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 8000000,
    price_current: 5000000,
    name_teacher: "Vinh Tỷ",
    rating_average: 4.9,
    overview: "Hiểu và sử dụng JavaScript từ nền tảng.",
    description:
      "Khóa học giúp bạn nắm vững JavaScript cơ bản, DOM manipulation, Event, ES6+, Promise, Async/Await.",
    status: "published",
    student_count: 41078,
    total_sections: 6,
    total_lectures: 50,
    total_video_duration: 300,
    total_hours: 5, // 300 phút = 5h
    category: "2", // Lập trình Frontend
  },
  {
    id: "course_5",
    author_id: "teacher_04",
    title: "ReactJS Từ Cơ Bản đến Nâng Cao",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 10000000,
    price_current: 5000000,
    name_teacher: "Tiến Đạt",
    rating_average: 4.8,
    overview: "Làm chủ ReactJS, Hooks, Context, Router.",
    description:
      "Khóa học ReactJS giúp bạn xây dựng SPA, quản lý state với Redux/Context, kết nối API, tối ưu hiệu năng.",
    status: "published",
    student_count: 76967,
    total_sections: 10,
    total_lectures: 120,
    total_video_duration: 500,
    total_hours: 8.3, // 500 phút ≈ 8.3h
    category: "2", // Lập trình Frontend
  },

  // ✅ ALGORITHM COURSES
  {
    id: "course_6",
    author_id: "teacher_05",
    title: "Thuật toán & Cấu trúc dữ liệu",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 6000000,
    price_current: 3000000,
    name_teacher: "Cường Á",
    rating_average: 4.9,
    overview: "Nắm vững thuật toán, cấu trúc dữ liệu.",
    description:
      "Khóa học bao gồm Linked List, Stack, Queue, Tree, Graph, thuật toán sắp xếp, tìm kiếm và các bài toán nâng cao.",
    status: "published",
    student_count: 30000,
    total_sections: 7,
    total_lectures: 80,
    total_video_duration: 350,
    total_hours: 5.8, // 350 phút ≈ 5.8h
    category: "3", // Thuật toán & Cấu trúc dữ liệu
  },

  // ✅ BACKEND COURSES
  {
    id: "course_7",
    author_id: "teacher_06",
    title: "NodeJS Backend API",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 25000000,
    price_current: 12800000,
    name_teacher: "Cường Á",
    rating_average: 4.8,
    overview: "Xây dựng REST API với NodeJS & Express.",
    description:
      "Khóa học chuyên sâu về Backend NodeJS, xây dựng hệ thống E-Commerce, xác thực JWT, MongoDB, Redis, RabbitMQ.",
    status: "published",
    student_count: 30500,
    total_sections: 8,
    total_lectures: 100,
    total_video_duration: 480,
    total_hours: 8, // 480 phút = 8h
    category: "4", // Lập trình Backend
  },
  {
    id: "course_8",
    author_id: "teacher_07",
    title: "NestJS Backend Nâng Cao",
    avatar: "src/assets/images/courseItem.jpg",
    price_old: 30000000,
    price_current: 15000000,
    name_teacher: "Đào Sỹ Mạnh",
    rating_average: 4.85,
    overview: "NestJS - Framework mạnh mẽ cho Backend.",
    description:
      "Học cách xây dựng hệ thống microservice, tích hợp GraphQL, TypeORM, bảo mật nâng cao với NestJS.",
    status: "published",
    student_count: 20000,
    total_sections: 9,
    total_lectures: 110,
    total_video_duration: 520,
    total_hours: 8.7, // 520 phút ≈ 8.7h
    category: "4", // Lập trình Backend
  },
];
