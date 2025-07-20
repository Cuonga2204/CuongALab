import React from "react";
import { Card, Rate } from "antd";
import {
  TeamOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { Course } from "../../../types/course.type";
import { IMAGES } from "../../../assets/images";

interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <Card
      cover={
        <div className="relative">
          <img
            src={IMAGES.courseItem}
            alt={course.title}
            className="h-48 w-full object-cover"
          />
          <div className="absolute w-[45px] bottom-[30px] right-0 ">
            <img src={IMAGES.badge} className="" />
            <div className="text-white absolute top-1/2 left-1/2 text-xs -translate-y-1/2 -translate-x-1/2 ">
              Giảm <br /> 50%
            </div>
          </div>
        </div>
      }
      className="shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* Tên khóa học */}
      <h3 className="text-lg font-bold text-primary line-clamp-2 min-h-[48px]">
        {course.title}
      </h3>

      {/* Rating + Số đánh giá */}
      <div className="flex items-center gap-2 mt-2">
        <Rate allowHalf disabled defaultValue={course.rating_average} />
        <span className="text-sm text-gray-500">
          ({course.rating_average.toFixed(1)})
        </span>
      </div>

      {/* Thông tin chi tiết */}
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

      {/* Giá */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-5">
          <p className="text-lg font-bold text-red-500">
            {course.price_current.toLocaleString()}₫
          </p>
          <p className="text-gray-400 line-through text-lg">
            {course.price_old.toLocaleString()}₫
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CourseItem;
