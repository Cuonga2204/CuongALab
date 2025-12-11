import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "src/pages/other/auth/apis/auth.api";
import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";
import type { LoginRequest } from "src/pages/other/auth/types/auth.types";
import { useAuthStore } from "src/store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: async (res) => {
      await setAuth(res.accessToken, res.user);
      // Redirect theo role
      switch (res.user.role) {
        case "admin":
          navigate("/admin/courses");
          break;

        case "teacher":
          navigate("/teacher/courses");
          break;

        default:
          navigate("/"); // user bình thường → trang user home
      }

      toast.success(SuccessMessageEnum["AUTH-001"]);
    },
    onError: () => {
      toast.error(ValidationMessageEnum["AUTH-0005"]);
    },
  });
};
