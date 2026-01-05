import { useState } from "react";
import { Avatar, Button, Space, Typography, Input } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { useAuthStore } from "src/store/authStore";
import type { CommentItem } from "src/pages/user/Lecture/types/comment.types";
import {
  useAddComment,
  useLikeComment,
  useUnlikeComment,
} from "src/pages/user/Lecture/hooks/useComment.hook";
import { timeAgo } from "src/helpers/time.helpers";

const { TextArea } = Input;
const { Text } = Typography;

interface Props {
  comment: CommentItem;
  isEnrolled: boolean;
}

/* ======================
   TIME AGO HELPER
====================== */

export default function CommentNode({ comment, isEnrolled }: Props) {
  const { user } = useAuthStore();

  const addComment = useAddComment(comment.lecture_id);
  const like = useLikeComment(comment.lecture_id);
  const unlike = useUnlikeComment(comment.lecture_id);

  const isLiked = comment.likes?.includes(String(user?.id));

  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  /* ======================
        SUBMIT REPLY
  ====================== */
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

  /* ======================
        LIKE / UNLIKE
  ====================== */
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
          {/* ======================
                NAME + TIME
          ====================== */}
          <Space size={8}>
            <Text strong>{comment.user_id.name}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {timeAgo(comment.createdAt)}
            </Text>
          </Space>

          {/* ======================
                CONTENT
          ====================== */}
          <div style={{ marginTop: 4 }}>{comment.content}</div>

          {/* ======================
                ACTIONS
          ====================== */}
          <Space size={12} style={{ marginTop: 6 }}>
            {/* LIKE */}
            <Button
              size="small"
              onClick={toggleLike}
              type="text"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: isLiked ? "#1677ff" : "#595959",
              }}
            >
              {isLiked ? <LikeFilled /> : <LikeOutlined />}
              {comment.likes.length}
            </Button>

            {/* REPLY */}
            {isEnrolled && (
              <Button
                type="link"
                size="small"
                style={{ padding: 0 }}
                onClick={() => setReplying(!replying)}
              >
                Reply
              </Button>
            )}
          </Space>

          {/* ======================
                REPLY INPUT
          ====================== */}
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

          {/* ======================
                TOGGLE REPLIES
          ====================== */}
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

          {/* ======================
                REPLIES LIST
          ====================== */}
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
