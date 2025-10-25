import { useNavigate } from "react-router-dom";
import { AuthPathsEnum } from "src/pages/other/auth/constants/auth.paths";
import { useAuthStore } from "src/store/authStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const logout = () => {
    clearAuth();

    navigate(AuthPathsEnum.LOGIN);
  };

  return { logout };
};
