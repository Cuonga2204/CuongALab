import axiosClient from "src/api/axiosClient";
import type { FavoriteCourse } from "../types/favoriteCourse.types";

// 🔹 Lấy danh sách khóa học yêu thích của user
export const getFavoritesByUser = async (userId: string) => {
  const response = await axiosClient.get(`/favorites/${userId}`);
  return response.data.data as FavoriteCourse[];
};

// 🔹 Thêm hoặc xóa khóa học khỏi danh sách yêu thích (toggle)
export const toggleFavorite = async (params: {
  userId?: string;
  courseId: string;
}) => {
  const response = await axiosClient.post(`/favorites/toggle`, params);
  return response.data as { success: boolean; isFavorite: boolean };
};

// 🔹 Xóa thủ công một mục yêu thích (ít dùng)
export const deleteFavorite = async (id: string) => {
  const response = await axiosClient.delete(`/favorites/${id}`);
  return response.data;
};
