import React, { useState } from "react";
import { Card, Rate, Button } from "antd";
import {
  TeamOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { IMAGES } from "src/assets/images";
import type { Course } from "src/types/course.type";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "src/helpers/get-img-src.helpers";
import { useAuthStore } from "src/store/authStore";
import {
  useAddToCart,
  useGetUserCart,
} from "src/pages/user/Cart/hooks/useCart.hooks";

interface CourseItemProps {
  course: Course;
  isUserCourse?: boolean;
}

const CourseItem = ({ course, isUserCourse = false }: CourseItemProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const { data: cart } = useGetUserCart(user?.id || "");

  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCartMutation = useAddToCart(user?.id || "");

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      // Có thể redirect login hoặc hiển thị toast
      console.warn("Vui lòng đăng nhập trước khi thêm vào giỏ");
      return;
    }
    addToCartMutation.mutate(course.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };
  const isInCart = cart?.items?.some((item) => item.id === course.id);

  return (
    <Card
      onClick={handleClick}
      hoverable
      cover={
        <div className="relative">
          <img
            src={getImageSrc(course.avatar)}
            alt={course.title}
            className="h-48 w-full object-cover"
          />
          <div className="absolute w-[45px] bottom-[30px] right-0">
            <img src={IMAGES.badge} alt="badge" />
            <div className="text-white absolute top-1/2 left-1/2 text-xs -translate-y-1/2 -translate-x-1/2 text-center leading-tight">
              Giảm <br /> 50%
            </div>
          </div>
        </div>
      }
      className="shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <h3 className="text-lg font-bold text-primary line-clamp-2 min-h-[48px]">
        {course.title}
      </h3>

      <div className="flex items-center gap-2 mt-2">
        <Rate
          allowHalf
          disabled
          defaultValue={course.rating_average || 0}
          style={{ fontSize: 14 }}
        />
        <span className="text-sm text-gray-500">
          ({(course.rating_average || 0).toFixed(1)})
        </span>
      </div>

      <div className="text-sm text-gray-600 mt-3 space-y-1">
        <p>
          <VideoCameraOutlined /> {course.total_lectures} bài giảng -{" "}
          {course.total_sections} phần
        </p>
        <p>
          <TeamOutlined /> {course.student_count} học viên
        </p>
        <p>
          <ClockCircleOutlined /> Thời lượng: {course.total_video_duration} phút
        </p>
        <p>
          <UserAddOutlined /> Giảng viên: {course.name_teacher}
        </p>
      </div>
      {!isUserCourse && (
        <>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-5">
              <p className="text-lg font-bold text-red-500">
                {course.price_current.toLocaleString()}₫
              </p>
              <p className="text-gray-400 line-through text-lg">1.000.000₫</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-200">
            <Button
              loading={addToCartMutation.isPending}
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              Thêm vào giỏ
            </Button>

            <Button
              shape="circle"
              icon={
                isFavorite ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={handleToggleFavorite}
            />
          </div>
        </>
      )}
    </Card>
  );
};

export default CourseItem;
