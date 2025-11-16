import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { FavoriteCourse } from "../types/favoriteCourse.types";
import {
  getFavoritesByUser,
  toggleFavorite,
} from "src/pages/user/FavoriteCourses/apis/favoriteCourse.api";

// 🔹 Lấy danh sách yêu thích theo user
export const useGetFavoritesByUser = (userId: string) => {
  return useQuery<FavoriteCourse[]>({
    queryKey: ["favorites", userId],
    queryFn: () => getFavoritesByUser(userId),
    enabled: !!userId,
  });
};

// 🔹 Thêm / xóa khóa học khỏi danh sách yêu thích
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
    },
  });
};
