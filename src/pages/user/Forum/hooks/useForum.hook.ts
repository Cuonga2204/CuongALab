import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTopicApi,
  getTopicsApi,
  getTopicDetailApi,
  createReplyApi,
  upvoteTopicApi,
  upvoteReplyApi,
} from "../apis/forum.api";

import type {
  CreateTopicPayload,
  CreateReplyPayload,
  UpvoteReplyPayload,
  UpvoteTopicPayload,
} from "../types/forum.types";

import type { GetTopicsParams } from "../apis/forum.api";

export const useGetTopics = (params: GetTopicsParams) =>
  useQuery({
    queryKey: ["forumTopics", params],
    queryFn: () => getTopicsApi(params),
  });

export const useGetTopicDetail = (topicId: string) =>
  useQuery({
    queryKey: ["forumTopicDetail", topicId],
    queryFn: () => getTopicDetailApi(topicId),
    enabled: !!topicId,
  });

export const useCreateTopic = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTopicPayload) => createTopicApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forumTopics"] }),
  });
};

export const useCreateReply = (topicId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReplyPayload) => createReplyApi(payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["forumTopicDetail", topicId] }),
  });
};

export const useUpvoteTopic = (topicId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpvoteTopicPayload) => upvoteTopicApi(payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["forumTopicDetail", topicId] }),
  });
};

export const useUpvoteReply = (topicId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpvoteReplyPayload) => upvoteReplyApi(payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["forumTopicDetail", topicId] }),
  });
};
