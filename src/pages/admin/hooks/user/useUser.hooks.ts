import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  deleteUserApi,
  getTeachers,
  getUsers,
  updateUserApi,
} from "src/pages/admin/api/user.api";
import type {
  UserFormData,
  UserListResponse,
} from "src/pages/admin/types/user.types";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};

export const useGetUsers = (page: number, limit: number) => {
  return useQuery<UserListResponse>({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
    placeholderData: (previous) => previous,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

/* =============================
    UPDATE USER
============================= */
export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormData }) =>
      updateUserApi(id, data),

    onSuccess: () => {
      toast.success("User updated successfully!");
      qc.invalidateQueries({ queryKey: ["users"], exact: false });
    },

    onError: () => toast.error("Update failed"),
  });
};

/* =============================
    DELETE USER
============================= */
export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserApi(id),

    onSuccess: () => {
      toast.success("User deleted!");
      qc.invalidateQueries({ queryKey: ["users"], exact: false });
    },

    onError: () => toast.error("Delete failed"),
  });
};
