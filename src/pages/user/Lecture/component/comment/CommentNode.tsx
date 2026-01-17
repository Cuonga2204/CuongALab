import { useState } from "react";
import {
  Avatar,
  Button,
  Space,
  Typography,
  Input,
  Dropdown,
  Modal,
} from "antd";
import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { useAuthStore } from "src/store/authStore";
import type { CommentItem } from "src/pages/user/Lecture/types/comment.types";
import {
  useAddComment,
  useLikeComment,
  useUnlikeComment,
  useEditComment,
  useDeleteComment,
} from "src/pages/user/Lecture/hooks/useComment.hook";
import { timeAgo } from "src/helpers/time.helpers";

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
  const edit = useEditComment(comment.lecture_id);
  const remove = useDeleteComment(comment.lecture_id);

  const isOwner = String(user?.id) === String(comment.user_id.id);
  const isLiked = comment.likes?.includes(String(user?.id));

  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(false);

  /* ======================
        REPLY
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
        LIKE
  ====================== */
  const toggleLike = () => {
    if (!user) return;

    if (isLiked) {
      unlike.mutate({ commentId: comment.id, userId: String(user.id) });
    } else {
      like.mutate({ commentId: comment.id, userId: String(user.id) });
    }
  };

  /* ======================
        EDIT
  ====================== */
  const submitEdit = () => {
    if (!editText.trim()) return;

    edit.mutate({
      commentId: comment.id,
      userId: String(user?.id),
      content: editText,
    });

    setEditing(false);
  };

  /* ======================
        DELETE (XÓA LUÔN)
  ====================== */
  const deleteComment = () => {
    Modal.confirm({
      title: "Xóa bình luận?",
      content: "Bình luận và các phản hồi sẽ bị xóa vĩnh viễn.",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () =>
        remove.mutate({
          commentId: comment.id,
          userId: String(user?.id),
        }),
    });
  };

  const menuItems = [
    {
      key: "edit",
      label: "Edit",
      onClick: () => setEditing(true),
    },
    {
      key: "delete",
      label: "Xóa",
      onClick: deleteComment,
    },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <Space align="start">
        <Avatar src={comment.user_id.avatar}>{comment.user_id.name[0]}</Avatar>

        <div style={{ width: "100%" }}>
          {/* NAME + TIME */}
          <Space size={8}>
            <Text strong>{comment.user_id.name}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {timeAgo(comment.createdAt)}
            </Text>

            {isOwner && (
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            )}
          </Space>

          {/* CONTENT */}
          {!editing ? (
            <div style={{ marginTop: 4 }}>{comment.content}</div>
          ) : (
            <div style={{ marginTop: 8 }}>
              <TextArea
                rows={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Space style={{ marginTop: 6 }}>
                <Button size="small" type="primary" onClick={submitEdit}>
                  Save
                </Button>
                <Button size="small" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Space>
            </div>
          )}

          {/* ACTIONS */}
          <Space size={12} style={{ marginTop: 6 }}>
            <Button
              size="small"
              type="text"
              onClick={toggleLike}
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

          {/* REPLY INPUT */}
          {replying && (
            <div style={{ marginTop: 8 }}>
              <TextArea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Space style={{ marginTop: 6 }}>
                <Button size="small" type="primary" onClick={submitReply}>
                  Reply
                </Button>
                <Button size="small" onClick={() => setReplying(false)}>
                  Cancel
                </Button>
              </Space>
            </div>
          )}

          {/* REPLIES */}
          {comment.replies.length > 0 && (
            <Button
              type="link"
              size="small"
              style={{ paddingLeft: 0 }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? "Hide replies"
                : `${comment.replies.length} replies`}
            </Button>
          )}

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
