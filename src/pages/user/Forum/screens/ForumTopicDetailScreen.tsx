import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Space, Typography, Avatar, Tag } from "antd";
import { useState } from "react";

import { useAuthStore } from "src/store/authStore";
import {
  useGetTopicDetail,
  useUpvoteTopic,
  useCreateReply,
} from "../hooks/useForum.hook";

import ReplyNode from "../components/ReplyNode";
import { useGetCourseDetail } from "src/pages/admin/hooks/course/useCourse.hooks";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ForumTopicDetailScreen() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // ALWAYS call hooks
  const { data, isLoading } = useGetTopicDetail(topicId || "");

  // extract courseId safely
  const courseId = data?.topic?.course_id || "";

  // call hook with enabled condition
  const { data: course } = useGetCourseDetail(courseId);

  const createReply = useCreateReply(topicId || "");
  const upvoteTopic = useUpvoteTopic(topicId || "");

  const [text, setText] = useState("");

  if (isLoading || !data) return <div>Loading...</div>;

  const { topic, replies } = data;

  const submitReply = () => {
    if (!text.trim()) return;

    createReply.mutate({
      topicId: topicId!,
      content: text,
      userId: String(user?.id),
      parentId: null,
    });

    setText("");
  };

  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: 900,
        margin: "0 auto",
        background: "#f8f9fa",
      }}
    >
      {/* Back */}
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </Button>

      {/* Topic Card */}
      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Space align="start">
          <Avatar src={topic.user_id.avatar} size={50}>
            {topic.user_id.name[0]}
          </Avatar>

          <div style={{ flex: 1 }}>
            <Title level={3}>{topic.title}</Title>

            {/* SHOW COURSE INFO */}
            {course && (
              <Tag color="blue" style={{ marginBottom: 10 }}>
                Khóa học: {course.title} — GV: {course.name_teacher}
              </Tag>
            )}

            <div
              style={{
                background: "#fafafa",
                padding: 16,
                marginBottom: 12,
                borderRadius: 8,
              }}
              dangerouslySetInnerHTML={{ __html: topic.content }}
            />

            <Button
              type="link"
              onClick={() =>
                upvoteTopic.mutate({
                  topicId: topicId!,
                  userId: String(user?.id),
                })
              }
            >
              👍 {topic.upvotes.length}
            </Button>

            <Text type="secondary">Posted by {topic.user_id.name}</Text>
          </div>
        </Space>
      </Card>

      {/* Replies */}
      <Title level={4}>Replies ({replies.length})</Title>

      {replies.map((reply) => (
        <ReplyNode key={reply.id} reply={reply} topicId={topicId!} />
      ))}

      {/* Reply input */}
      <Card style={{ marginTop: 24, borderRadius: 12 }}>
        <Title level={4}>Write a reply</Title>
        <TextArea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
        />
        <Button type="primary" style={{ marginTop: 10 }} onClick={submitReply}>
          Post Reply
        </Button>
      </Card>
    </div>
  );
}
