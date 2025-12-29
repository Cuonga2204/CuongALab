import { Card, Rate, Flex, Tag, Empty } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "src/store/authStore";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { getImageSrc } from "src/helpers/get-img-src.helpers";

import { useGetCoursesByUser } from "src/pages/user/MyCourses/hooks/useUserCourses.hooks";

import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";

import { USER_COURSE_STATUS } from "src/pages/user/MyCourses/constants/user-courses.constants";

import type { UserCourse } from "src/pages/user/MyCourses/types/user-courses.types";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";
import type { Course } from "src/types/course.type";
import { useGetRecommendedCoursesByUser } from "src/pages/admin/hooks/userCourse/useUserCourse.hooks";

export default function UserCoursesScreen() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  /* ===============================
     1. FETCH DATA
  =============================== */
  const {
    data: userCourses = [],
    isLoading,
    isError,
  } = useGetCoursesByUser(user?.id || "");

  const { data: recommendedCourses = [] } = useGetRecommendedCoursesByUser(
    user?.id || ""
  );

  const { data: categoryTree = [], isLoading: loadingCategories } =
    useGetCategoryTree();

  if (isLoading || loadingCategories) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  /* ===============================
     2. EMPTY STATE
  =============================== */
  if (!userCourses.length) {
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Bạn chưa ghi danh khóa học nào 😢" />
      </div>
    );
  }

  /* ===============================
     3. HELPERS
  =============================== */
  const handleClick = (courseId: string, isEnrolled: boolean) => {
    navigate(`/course/${courseId}`, { state: { isEnrolled } });
  };

  // chỉ lấy root category (level 1)
  const rootCategories = categoryTree.filter((c) => c.level === 1);

  /* ===============================
     4. RENDER
  =============================== */
  return (
    <div className="bg-primary-background">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Khoá học của tôi
        </h2>

        {/* =====================================
           PHẦN 1: KHÓA HỌC ĐÃ MUA (CŨ)
        ===================================== */}
        {rootCategories.map((root: CategoryTreeItem) => {
          const coursesByRoot = userCourses.filter(
            (uc: UserCourse) => uc.category?.root_id === root.id
          );

          if (coursesByRoot.length === 0) return null;

          return (
            <div key={root.id} className="mb-14">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">
                {root.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {coursesByRoot.map((userCourse: UserCourse) => (
                  <Card
                    key={userCourse.id}
                    hoverable
                    onClick={() => handleClick(userCourse.courseId, true)}
                    cover={
                      <img
                        src={getImageSrc(userCourse.avatar)}
                        alt={userCourse.title}
                        className="h-40 w-full object-cover"
                      />
                    }
                  >
                    <h3 className="font-semibold line-clamp-2">
                      {userCourse.title}
                    </h3>

                    <div className="text-sm text-gray-600 mt-3 space-y-1">
                      <p>
                        <VideoCameraOutlined /> {userCourse.total_lectures} bài
                        giảng • {userCourse.total_sections} phần
                      </p>
                      <p>
                        <TeamOutlined /> {userCourse.student_count} học viên
                      </p>
                      <p>
                        <ClockCircleOutlined />{" "}
                        {userCourse.total_video_duration} phút học
                      </p>
                      <p>
                        <UserAddOutlined /> Giảng viên:{" "}
                        {userCourse.name_teacher}
                      </p>
                    </div>

                    <Flex vertical className="mt-3" gap={12}>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={userCourse.rating_average}
                      />
                      <Tag
                        className="text-sm font-medium w-[140px] text-center"
                        color={
                          userCourse.status === USER_COURSE_STATUS.IN_PROGRESS
                            ? "processing"
                            : "success"
                        }
                      >
                        {userCourse.status}
                      </Tag>
                    </Flex>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* =====================================
           PHẦN 2: 🔥 KHÓA HỌC LIÊN QUAN (RECOMMEND)
        ===================================== */}
        {recommendedCourses.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
              Khóa học liên quan dành cho bạn
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedCourses.map((course: Course) => (
                <Card
                  key={course.id}
                  hoverable
                  onClick={() => handleClick(course.id, false)}
                  cover={
                    <img
                      src={getImageSrc(course.avatar)}
                      alt={course.title}
                      className="h-40 w-full object-cover"
                    />
                  }
                >
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>

                  <div className="text-sm text-gray-600 mt-3 space-y-1">
                    <p>
                      <VideoCameraOutlined /> {course.total_lectures} bài giảng
                      • {course.total_sections} phần
                    </p>
                    <p>
                      <TeamOutlined /> {course.student_count} học viên
                    </p>
                    <p>
                      <ClockCircleOutlined /> {course.total_video_duration} phút
                      học
                    </p>
                    <p>
                      <UserAddOutlined /> Giảng viên: {course.name_teacher}
                    </p>
                  </div>

                  <Flex vertical className="mt-3" gap={12}>
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={course.rating_average}
                    />

                    {course.is_discount_active && (
                      <Tag color="red" className="w-fit">
                        Giảm {course.discount_percent}%
                      </Tag>
                    )}
                  </Flex>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
