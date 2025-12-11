import type { User } from "src/types/auth.type";

interface SetAuthProps {
  token: string;
  user: User;
}

export const authHelpers = {
  setAuth: ({ token, user }: SetAuthProps) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  },

  getAuth: () => {
    const token = sessionStorage.getItem("accessToken");
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    return {
      accessToken: token,
      user,
    };
  },

  clearAuth: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
  },
};
