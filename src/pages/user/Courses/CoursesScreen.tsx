import { Empty } from "antd";
import CourseItem from "src/components/commons/Course/CourseItem";
import { useGetAllCourses } from "src/pages/admin/hooks/course/useCourse.hooks";
import { COURSE_CATEGORIES } from "src/constants/course.constants";
import type { Course } from "src/types/course.type";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";

export default function Courses() {
  const { data, isLoading, isError } = useGetAllCourses();

  if (isLoading) return <Loader />;

  if (isError) return <DisplayLoadApi />;

  const courses = data?.courses || [];

  const categories = Object.values(COURSE_CATEGORIES);

  if (!courses.length)
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Không có khóa học nào" />
      </div>
    );

  return (
    <div className="bg-primary-background">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Danh Sách Khóa Học
        </h2>

        {categories.map((category) => {
          const filteredCourses = courses.filter(
            (c: Course) => c.category === category
          );

          if (filteredCourses.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-colsa-4 gap-6">
                {filteredCourses.map((course: Course) => (
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
