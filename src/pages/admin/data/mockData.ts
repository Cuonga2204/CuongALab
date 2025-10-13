import type { Course } from "src/pages/admin/types/course.types";
import type { User } from "src/pages/admin/types/user.types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Administrator",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Instructor",
    status: "Active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    role: "Student",
    status: "Inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Instructor",
    status: "Active",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Student",
    status: "Active",
    createdAt: "2024-05-12",
  },
];

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Development",
    instructor: "Bob Smith",
    category: "Programming",
    students: 245,
    duration: "12 weeks",
    status: "Active",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    instructor: "David Brown",
    category: "Design",
    students: 189,
    duration: "8 weeks",
    status: "Active",
  },
  {
    id: "3",
    title: "Data Science with Python",
    instructor: "Bob Smith",
    category: "Data Science",
    students: 312,
    duration: "16 weeks",
    status: "Active",
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "David Brown",
    category: "Marketing",
    students: 156,
    duration: "6 weeks",
    status: "Completed",
  },
  {
    id: "5",
    title: "Mobile App Development",
    instructor: "Bob Smith",
    category: "Programming",
    students: 201,
    duration: "14 weeks",
    status: "Active",
  },
];
