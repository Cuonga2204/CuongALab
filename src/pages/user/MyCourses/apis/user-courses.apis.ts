import axiosClient from "src/api/axiosClient";
import { UserCourseEndpointsEnum } from "src/pages/user/MyCourses/constants/user-courses.endpoints";

export const UserCourseApi = {
  /** 🟢 Ghi danh (user enroll course) */
  enrollCourse: async (payload: { user_id: string; course_id: string }) => {
    const response = await axiosClient.post(
      UserCourseEndpointsEnum.ENROLL_COURSE,
      payload
    );
    return response.data.data;
  },

  /** 🔵 Lấy danh sách khóa học của user */
  getCoursesByUser: async (user_id: string) => {
    const response = await axiosClient.get(
      UserCourseEndpointsEnum.GET_COURSES_BY_USER.replace(":user_id", user_id)
    );
    console.log(`response.data.data :`, response.data.data);
    return response.data.data;
  },

  /** 🟣 Lấy danh sách user đã học 1 khóa */
  getUsersByCourse: async (course_id: string) => {
    const response = await axiosClient.get(
      UserCourseEndpointsEnum.GET_USERS_BY_COURSE.replace(
        ":course_id",
        course_id
      )
    );
    return response.data.data;
  },

  /** 🟠 Cập nhật trạng thái học */
  updateStatus: async (id: string, status: string) => {
    const response = await axiosClient.put(
      UserCourseEndpointsEnum.UPDATE_STATUS.replace(":id", id),
      { status }
    );
    return response.data.data;
  },

  /** 🔴 Xoá ghi danh */
  deleteEnroll: async (id: string) => {
    const response = await axiosClient.delete(
      UserCourseEndpointsEnum.DELETE_ENROLL.replace(":id", id)
    );
    return response.data.data;
  },
};
