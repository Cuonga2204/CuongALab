import { useState } from "react";
import { Avatar, Button, Space, Typography, Input } from "antd";
import { useAuthStore } from "src/store/authStore";
import type { CommentItem } from "src/pages/user/Lecture/types/comment.types";
import {
  useAddComment,
  useLikeComment,
  useUnlikeComment,
} from "src/pages/user/Lecture/hooks/useComment.hook";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

interface Props {
  comment: CommentItem;
  isEnrolled: boolean;
}

export default function CommentNode({ comment, isEnrolled }: Props) {
  const { user } = useAuthStore();
  const addComment = useAddComment(comment.lecture_id);

  const like = useLikeComment(comment.lecture_id);
  const unlike = useUnlikeComment(comment.lecture_id);

  /** Check user đã like comment chưa */
  const isLiked = comment.likes?.includes(String(user?.id));

  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  /** Submit reply */
  const submitReply = () => {
    if (!replyText.trim()) return;

    addComment.mutate({
      lectureId: comment.lecture_id,
      content: replyText,
      userId: String(user?.id),
      parentId: comment.id,
    });

    setReplyText("");
    setReplying(false);
    setShowReplies(true);
  };

  /** Toggle like / unlike */
  const toggleLike = () => {
    if (!user) return;

    if (isLiked) {
      unlike.mutate({
        commentId: comment.id,
        userId: String(user.id),
      });
    } else {
      like.mutate({
        commentId: comment.id,
        userId: String(user.id),
      });
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Space align="start">
        <Avatar src={comment.user_id.avatar}>{comment.user_id.name[0]}</Avatar>

        <div style={{ width: "100%" }}>
          {/* USER NAME + CONTENT */}
          <Text strong>{comment.user_id.name}</Text>
          <div style={{ marginTop: 4 }}>{comment.content}</div>

          {/* ACTIONS: LIKE - REPLY */}
          <Space style={{ marginTop: 6 }}>
            {/* LIKE BUTTON */}
            <Button
              size="small"
              onClick={toggleLike}
              style={{
                borderRadius: "20px",
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: isLiked ? "#e6f4ff" : "#f5f5f5",
                border: "none",
              }}
            >
              {isLiked ? (
                <LikeFilled style={{ fontSize: 16, color: "#1677ff" }} />
              ) : (
                <LikeOutlined style={{ fontSize: 16 }} />
              )}

              <span style={{ fontSize: 14, color: "#333" }}>
                {comment.likes.length}
              </span>
            </Button>

            {/* REPLY BUTTON */}
            {isEnrolled && (
              <Button
                type="link"
                size="small"
                onClick={() => setReplying(!replying)}
              >
                Reply
              </Button>
            )}
          </Space>

          {/* REPLY INPUT */}
          {replying && (
            <div style={{ marginTop: 8 }}>
              <TextArea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
              />

              <Space style={{ marginTop: 6 }}>
                <Button type="primary" size="small" onClick={submitReply}>
                  Reply
                </Button>
                <Button size="small" onClick={() => setReplying(false)}>
                  Cancel
                </Button>
              </Space>
            </div>
          )}

          {/* SHOW REPLIES BUTTON */}
          {comment.replies.length > 0 && (
            <Button
              type="link"
              size="small"
              style={{ paddingLeft: 0, marginTop: 8 }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? "Hide replies"
                : `${comment.replies.length} replies`}
            </Button>
          )}

          {/* REPLIES LIST */}
          {showReplies && (
            <div style={{ marginTop: 12, marginLeft: 48 }}>
              {comment.replies.map((r) => (
                <CommentNode key={r.id} comment={r} isEnrolled={isEnrolled} />
              ))}
            </div>
          )}
        </div>
      </Space>
    </div>
  );
}
