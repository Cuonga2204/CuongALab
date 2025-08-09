// src/mock/mockSections.js

import type { Section } from "src/types/section.type";

export const mockSections: Section[] = [
  {
    id: "sec-1",
    course_id: "course_1",
    title: "A. Giao diện Người dùng (Client)",
    position_in_course: 1,
    total_lectures: 6,
    total_duration: 120,
  },
  {
    id: "sec-2",
    course_id: "course_1",
    title: "B. Hệ thống Quản trị (Admin Panel)",
    position_in_course: 2,
    total_lectures: 4,
    total_duration: 90,
  },
  {
    id: "sec-3",
    course_id: "course_1",
    title: "C. Xây dựng File Storage Microservice",
    position_in_course: 3,
    total_lectures: 5,
    total_duration: 100,
  },

  {
    id: "sec-4",
    course_id: "course_1",
    title: "D. Kiến trúc & Nguyên lý Node.js",
    position_in_course: 4,
    total_lectures: 7,
    total_duration: 150,
  },
];
