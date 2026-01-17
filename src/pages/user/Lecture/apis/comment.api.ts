import axiosClient from "src/api/axiosClient";
import type {
  CommentPayload,
  CommentResponse,
} from "src/pages/user/Lecture/types/comment.types";

export const getCommentsApi = async (
  lectureId: string
): Promise<CommentResponse[]> => {
  const res = await axiosClient.get(`/comments/${lectureId}`);
  return res.data.data;
};

export const addCommentApi = async (payload: CommentPayload) => {
  const res = await axiosClient.post(`/comments/add`, payload);
  return res.data.data;
};

export const likeCommentApi = async (commentId: string, userId: string) => {
  const res = await axiosClient.post("/comments/like", { commentId, userId });
  return res.data.data;
};

export const unlikeCommentApi = async (commentId: string, userId: string) => {
  const res = await axiosClient.post("/comments/unlike", { commentId, userId });
  return res.data.data;
};

export const editCommentApi = async (
  commentId: string,
  userId: string,
  content: string
) => {
  const res = await axiosClient.put("/comments/edit", {
    commentId,
    userId,
    content,
  });
  return res.data.data;
};

export const deleteCommentApi = async (commentId: string, userId: string) => {
  const res = await axiosClient.post("/comments/delete", {
    commentId,
    userId,
  });
  return res.data.data;
};
