import { Card, Rate, Flex, Tag, Empty } from "antd";
import { useAuthStore } from "src/store/authStore";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { getImageSrc } from "src/helpers/get-img-src.helpers";
import { useGetCoursesByUser } from "src/pages/user/MyCourses/hooks/useUserCourses.hooks";
import { useNavigate } from "react-router-dom";
import {
  ClockCircleOutlined,
  TeamOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { USER_COURSE_STATUS } from "src/pages/user/MyCourses/constants/user-courses.constants";
import type { UserCourse } from "src/pages/user/MyCourses/types/user-courses.types";
import { useGetCategoryTree } from "src/pages/admin/hooks/category/useCategory.hooks";
import type { CategoryTreeItem } from "src/pages/admin/types/category.types";

export default function UserCoursesScreen() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: userCourses = [],
    isLoading,
    isError,
  } = useGetCoursesByUser(user?.id || "");

  const { data: categoryTree = [], isLoading: loadingCategories } =
    useGetCategoryTree();
  if (isLoading || loadingCategories) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  if (!userCourses.length)
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Bạn chưa ghi danh khóa học nào 😢" />
      </div>
    );

  const handleClick = (courseId: string, isEnrolled: boolean) => {
    navigate(`/course/${courseId}`, { state: { isEnrolled } });
  };

  /**
   * 🔑 CHỈ LẤY ROOT CATEGORY (LEVEL 1)
   */
  const rootCategories = categoryTree.filter((c) => c.level === 1);

  return (
    <div className="bg-primary-background">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Khoá học của tôi
        </h2>

        {rootCategories.map((root: CategoryTreeItem) => {
          const coursesByRoot = userCourses.filter(
            (uc: UserCourse) => uc.category?.root_id === root.id
          );

          if (coursesByRoot.length === 0) return null;

          return (
            <div key={root.id} className="mb-12">
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

                    <Flex vertical className="mt-2" gap={20}>
                      <Rate disabled defaultValue={userCourse.rating_average} />
                      <Tag
                        className="text-sm font-medium w-[120px] text-center"
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
      </div>
    </div>
  );
}
