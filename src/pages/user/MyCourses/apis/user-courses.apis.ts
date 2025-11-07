import axiosClient from "src/api/axiosClient";
import { UserCourseEndpointsEnum } from "src/pages/user/MyCourses/constants/user-courses.endpoints";

export const UserCourseApi = {
  enrollCourse: async (payload: { user_id: string; course_id: string }) => {
    const response = await axiosClient.post(
      UserCourseEndpointsEnum.ENROLL_COURSE,
      payload
    );
    return response.data.data;
  },

  getCoursesByUser: async (user_id: string) => {
    const response = await axiosClient.get(
      UserCourseEndpointsEnum.GET_COURSES_BY_USER.replace(":user_id", user_id)
    );
    return response.data.data;
  },

  getUsersByCourse: async (course_id: string) => {
    const response = await axiosClient.get(
      UserCourseEndpointsEnum.GET_USERS_BY_COURSE.replace(
        ":course_id",
        course_id
      )
    );
    return response.data.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await axiosClient.put(
      UserCourseEndpointsEnum.UPDATE_STATUS.replace(":id", id),
      { status }
    );
    return response.data.data;
  },

  deleteEnroll: async (id: string) => {
    const response = await axiosClient.delete(
      UserCourseEndpointsEnum.DELETE_ENROLL.replace(":id", id)
    );
    return response.data.data;
  },
};
