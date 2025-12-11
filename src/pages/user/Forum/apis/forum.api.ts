import axiosClient from "src/api/axiosClient";
import type {
  CreateTopicPayload,
  CreateReplyPayload,
  TopicItem,
  TopicDetailResponse,
  ReplyItem,
  UpvoteTopicPayload,
  UpvoteReplyPayload,
} from "../types/forum.types";

export interface GetTopicsParams {
  search?: string;
  courseId?: string;
  page?: number;
  limit?: number;
}

export const getTopicsApi = async (params: GetTopicsParams) => {
  const res = await axiosClient.get("/forum/topics", { params });
  return res.data.data; // { topics, pagination }
};

export const createTopicApi = async (payload: CreateTopicPayload) => {
  const res = await axiosClient.post("/forum/topic/create", payload);
  return res.data.data;
};

export const getTopicDetailApi = async (
  id: string
): Promise<TopicDetailResponse> => {
  const res = await axiosClient.get(`/forum/topic/${id}`);
  return res.data.data;
};

export const createReplyApi = async (
  payload: CreateReplyPayload
): Promise<ReplyItem> => {
  const res = await axiosClient.post("/forum/reply/create", payload);
  return res.data.data;
};

export const upvoteTopicApi = async (
  payload: UpvoteTopicPayload
): Promise<TopicItem> => {
  const res = await axiosClient.post("/forum/topic/upvote", payload);
  return res.data.data;
};

export const upvoteReplyApi = async (
  payload: UpvoteReplyPayload
): Promise<ReplyItem> => {
  const res = await axiosClient.post("/forum/reply/upvote", payload);
  return res.data.data;
};
