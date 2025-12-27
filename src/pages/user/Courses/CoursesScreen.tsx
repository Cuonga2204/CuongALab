import { Empty } from "antd";
import CourseItem from "src/components/commons/Course/CourseItem";
import { useGetAllCoursesPublic } from "src/pages/admin/hooks/course/useCourse.hooks";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

import type { Course } from "src/types/course.type";

import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";

export default function Courses() {
  const {
    data: courseData,
    isLoading: loadingCourses,
    isError,
  } = useGetAllCoursesPublic();

  const { data: categoryTree = [], isLoading: loadingCategories } =
    useGetCategoryTree();

  if (loadingCourses || loadingCategories) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  const courses: Course[] = courseData?.courses || [];

  if (!courses.length) {
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Không có khóa học nào" />
      </div>
    );
  }

  /* ======================
     GROUP COURSE BY ROOT
  ====================== */
  const coursesByRoot: Record<string, Course[]> = {};

  courses.forEach((course) => {
    const rootId = course.category?.root_id;
    if (!rootId) return;

    if (!coursesByRoot[rootId]) {
      coursesByRoot[rootId] = [];
    }
    coursesByRoot[rootId].push(course);
  });
  return (
    <div className="bg-primary-background">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Danh Sách Khóa Học
        </h2>

        {categoryTree.map((rootCategory) => {
          const rootCourses = coursesByRoot[rootCategory.id];

          if (!rootCourses || rootCourses.length === 0) return null;

          return (
            <div key={rootCategory.id} className="mb-12">
              {/* ===== ROOT CATEGORY ===== */}
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">
                {rootCategory.name}
              </h3>

              {/* ===== COURSES ===== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {rootCourses.map((course) => (
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
