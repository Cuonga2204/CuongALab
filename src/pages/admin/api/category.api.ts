import axiosClient from "src/api/axiosClient";
import { CategoryEndpointsEnum } from "../constants/category.endpoints";
import type {
  Category,
  CategoryTreeItem,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types/category.types";

/* =========================================================
   GET ALL CATEGORIES (FLAT)
========================================================= */
export const getAllCategories = async (): Promise<Category[]> => {
  const res = await axiosClient.get(CategoryEndpointsEnum.GET_ALL);
  return res.data.data;
};

/* =========================================================
   GET CATEGORY TREE (RECURSIVE – MAX 4 LEVEL)
========================================================= */
export const getCategoryTree = async (): Promise<CategoryTreeItem[]> => {
  const res = await axiosClient.get(CategoryEndpointsEnum.GET_TREE);
  return res.data.data;
};

/* =========================================================
   CREATE CATEGORY
   payload:
   {
     name: string;
     parent_id: string | null;
   }
========================================================= */
export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<Category> => {
  const res = await axiosClient.post(CategoryEndpointsEnum.CREATE, payload);
  return res.data.data;
};

/* =========================================================
   UPDATE CATEGORY
========================================================= */
export const updateCategory = async (
  id: string,
  payload: UpdateCategoryPayload
): Promise<Category> => {
  const res = await axiosClient.put(
    CategoryEndpointsEnum.UPDATE.replace(":id", id),
    payload
  );
  return res.data.data;
};

/* =========================================================
   DELETE CATEGORY
========================================================= */
export const deleteCategory = async (id: string): Promise<Category> => {
  const res = await axiosClient.delete(
    CategoryEndpointsEnum.DELETE.replace(":id", id)
  );
  return res.data.data;
};
