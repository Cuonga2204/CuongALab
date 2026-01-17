// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "src/store/authStore";

// interface Props {
//   allowedRoles: Array<"admin" | "teacher" | "user">;
// }

// export default function ProtectedRoute({ allowedRoles }: Props) {
//   const { user } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }
