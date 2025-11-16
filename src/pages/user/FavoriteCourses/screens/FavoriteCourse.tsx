import { Empty } from "antd";
import CourseItem from "src/components/commons/Course/CourseItem";
import { Loader } from "src/components/commons/Loader/Loader";
import { DisplayLoadApi } from "src/components/commons/DisplayLoadApi/DisplayLoadApi";
import { useAuthStore } from "src/store/authStore";
import { useGetFavoritesByUser } from "src/pages/user/FavoriteCourses/hooks/useFavoriteCourse.hooks";

export default function FavoriteCourse() {
  const { user } = useAuthStore();
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useGetFavoritesByUser(user?.id || "");

  if (isLoading) return <Loader />;
  if (isError) return <DisplayLoadApi />;

  // Lấy danh sách course từ favorites
  const favoriteCourses = favorites.map((fav) => fav.courseId);

  if (favoriteCourses.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <Empty description="Bạn chưa có khóa học yêu thích nào" />
      </div>
    );

  return (
    <div className="bg-primary-background min-h-screen">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          ❤️ Khóa Học Yêu Thích
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {favoriteCourses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
