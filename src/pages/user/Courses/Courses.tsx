import CourseItem from "src/components/commons/Course/CourseItem";
import { mockCourses } from "src/mock/mockCourses";

export default function Courses() {
  const categories = [
    { id: "1", title: "Khóa học cơ bản" },
    { id: "2", title: "Lập trình Frontend" },
    { id: "3", title: "Thuật toán & Cấu trúc dữ liệu" },
    { id: "4", title: "Lập trình Backend" },
  ];

  return (
    <div className="bg-primary-background">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Danh Sách Khóa Học
        </h2>

        {categories.map((cat) => {
          const filteredCourses = mockCourses.filter(
            (c) => c.category === cat.id
          );

          if (filteredCourses.length === 0) return null;

          return (
            <div key={cat.id} className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">
                {cat.title}
              </h3>
              <div className="grid grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseItem key={course.id} course={course} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
