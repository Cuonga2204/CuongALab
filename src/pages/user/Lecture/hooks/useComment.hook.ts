import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCommentApi,
  deleteCommentApi,
  editCommentApi,
  getCommentsApi,
  likeCommentApi,
  unlikeCommentApi,
} from "src/pages/user/Lecture/apis/comment.api";

import type { CommentPayload } from "../types/comment.types";

export const useGetComments = (lectureId: string) => {
  return useQuery({
    queryKey: ["comments", lectureId],
    queryFn: () => getCommentsApi(lectureId),
    enabled: !!lectureId,
  });
};

export const useAddComment = (lectureId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentPayload) => addCommentApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", lectureId] });
    },
  });
};
export const useLikeComment = (lectureId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string;
    }) => likeCommentApi(commentId, userId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["comments", lectureId] }),
  });
};

export const useUnlikeComment = (lectureId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string;
    }) => unlikeCommentApi(commentId, userId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["comments", lectureId] }),
  });
};

export const useEditComment = (lectureId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      userId,
      content,
    }: {
      commentId: string;
      userId: string;
      content: string;
    }) => editCommentApi(commentId, userId, content),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["comments", lectureId] }),
  });
};

export const useDeleteComment = (lectureId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string;
    }) => deleteCommentApi(commentId, userId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["comments", lectureId] }),
  });
};
