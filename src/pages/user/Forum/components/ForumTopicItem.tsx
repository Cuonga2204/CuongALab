import { Card, Space, Avatar, Typography, Tag } from "antd";
import { useGetCourseDetail } from "src/pages/admin/hooks/course/useCourse.hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MessageOutlined,
  LikeOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { TopicItem } from "src/pages/user/Forum/types/forum.types";

dayjs.extend(relativeTime);

const { Text } = Typography;

interface Props {
  topic: TopicItem;
  onClick: () => void;
  course_id?: string;
}

export default function ForumTopicItem({ topic, onClick, course_id }: Props) {
  const preview = topic.content.replace(/<[^>]+>/g, "").slice(0, 160);

  // GET COURSE
  const { data: course } = useGetCourseDetail(course_id || "");
  // Auto-color category
  const CATEGORY_COLOR: Record<string, string> = {
    frontend: "blue",
    backend: "green",
    ai: "purple",
    devops: "volcano",
    mobile: "cyan",
  };
  const categoryColor =
    CATEGORY_COLOR[(course?.category || "").toLowerCase()] || "default";

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        marginBottom: 16,
        borderRadius: 12,
        padding: 18,
        cursor: "pointer",
        border: "1px solid #f0f0f0",
      }}
    >
      <Space align="start" style={{ width: "100%" }}>
        {/* Avatar */}
        <Avatar src={topic.user_id.avatar} size={48}>
          {topic.user_id.name.charAt(0)}
        </Avatar>

        <div style={{ flex: 1 }}>
          {/* TOP ROW: Title + Course info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: 16,
            }}
          >
            {/* Title */}
            <Text strong style={{ fontSize: 17 }}>
              {topic.title}
            </Text>

            {/* COURSE INFO */}
            {course && (
              <Space wrap>
                {/* Category tag */}
                <Tag color={categoryColor} style={{ fontWeight: 600 }}>
                  {course.category}
                </Tag>

                {/* Course name + Teacher */}
                <Tag
                  color="blue"
                  icon={<BookOutlined />}
                  style={{ maxWidth: 320, whiteSpace: "nowrap" }}
                >
                  {course.title}
                </Tag>
                <Tag>GV: {course.name_teacher}</Tag>
              </Space>
            )}
          </div>

          {/* PREVIEW CONTENT */}
          <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>
            {preview}...
          </div>

          {/* FOOTER INFO */}
          <Space style={{ marginTop: 10, opacity: 0.85 }}>
            <Space>
              <UserOutlined />
              <Text type="secondary">{topic.user_id.name}</Text>
            </Space>

            <span>•</span>

            <Text type="secondary">{dayjs(topic.createdAt).fromNow()}</Text>

            <span>•</span>

            <Space>
              <LikeOutlined />
              <Text>{topic.upvotes.length}</Text>
            </Space>

            <span>•</span>

            <Space>
              <MessageOutlined />
              <Text>{topic.reply_count || 0}</Text>
            </Space>
          </Space>
        </div>
      </Space>
    </Card>
  );
}
