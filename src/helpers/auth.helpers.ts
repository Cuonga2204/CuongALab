import type { User } from "src/types/auth.type";

interface SetAuthProps {
  token: string;
  user: User;
}

export const authHelpers = {
  setAuth: ({ token, user }: SetAuthProps) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  getAuth: () => {
    const token = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return {
      accessToken: token,
      user,
    };
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },
};
