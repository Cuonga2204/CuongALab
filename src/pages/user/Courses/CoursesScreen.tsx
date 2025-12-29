import { Empty } from "antd";
import { useSearchParams } from "react-router-dom";

import CourseItem from "src/components/commons/Course/CourseItem";
import {
  useGetAllCoursesPublic,
  useSearchCourses,
} from "src/pages/admin/hooks/course/useCourse.hooks";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

import type { Course } from "src/types/course.type";

import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { Loader } from "src/components/commons/Loader/Loader";

export default function Courses() {
  /* ===============================
     1. LẤY KEYWORD TỪ URL
  =============================== */
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  /* ===============================
     2. FETCH DATA
  =============================== */

  // 🔹 Lấy toàn bộ course (chỉ dùng khi KHÔNG search)
  const {
    data: courseData,
    isLoading: loadingCourses,
    isError,
  } = useGetAllCoursesPublic();

  // 🔹 Lấy category tree (luôn cần)
  const { data: categoryTree = [], isLoading: loadingCategories } =
    useGetCategoryTree();

  // 🔹 Search + recommend (CHỈ khi có keyword)
  const { data: searchData, isLoading: searching } = useSearchCourses(keyword);

  /* ===============================
     3. LOADING & ERROR
  =============================== */
  if (loadingCourses || loadingCategories || searching) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  /* ===============================
     4. CASE 1: CÓ SEARCH
     → render kết quả + recommend
  =============================== */
  if (keyword) {
    const results: Course[] = searchData?.results || [];
    const recommends: Course[] = searchData?.recommends || [];

    return (
      <div className="bg-primary-background">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Kết quả tìm kiếm cho “{keyword}”
          </h2>

          {/* ===== SEARCH RESULTS ===== */}
          {results.length === 0 ? (
            <div className="flex justify-center mt-20">
              <Empty description="Không tìm thấy khóa học phù hợp" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {results.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </div>
          )}

          {/* ===== RECOMMEND ===== */}
          {recommends.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold text-red-600 mb-6">
                Gợi ý khóa học tương tự
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {recommends.map((course) => (
                  <CourseItem key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ===============================
     5. CASE 2: KHÔNG SEARCH
     → render group theo category (code cũ)
  =============================== */

  const courses: Course[] = courseData?.courses || [];

  if (!courses.length) {
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Không có khóa học nào" />
      </div>
    );
  }

  /* ===== GROUP COURSE BY ROOT CATEGORY ===== */
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
