import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getAllCategories,
  getCategoryTree,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category.api";

import type {
  Category,
  CategoryTreeItem,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../../types/category.types";

/* =========================================================
   GET ALL CATEGORIES (FLAT)
========================================================= */
export const useGetAllCategories = () =>
  useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

/* =========================================================
   GET CATEGORY TREE (TREE – DÙNG CHO UI CÂY)
========================================================= */
export const useGetCategoryTree = () =>
  useQuery<CategoryTreeItem[]>({
    queryKey: ["category-tree"],
    queryFn: getCategoryTree,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

/* =========================================================
   CREATE CATEGORY
========================================================= */
export const useCreateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),

    onSuccess: () => {
      toast.success("Create category success");
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category-tree"] });
    },

    onError: () => {
      toast.error("Create category failed");
    },
  });
};

/* =========================================================
   UPDATE CATEGORY
========================================================= */
interface UpdateCategoryParams {
  id: string;
  data: UpdateCategoryPayload;
}

export const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryParams) =>
      updateCategory(id, data),

    onSuccess: () => {
      toast.success("Update category success");
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category-tree"] });
    },

    onError: () => {
      toast.error("Update category failed");
    },
  });
};

/* =========================================================
   DELETE CATEGORY
========================================================= */
export const useDeleteCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onSuccess: () => {
      toast.success("Delete category success");
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category-tree"] });
    },

    onError: () => {
      toast.error("Delete category failed");
    },
  });
};
