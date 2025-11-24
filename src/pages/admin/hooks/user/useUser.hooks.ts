import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "src/pages/admin/api/user.api";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};
