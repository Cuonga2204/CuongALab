import { useState } from "react";
import { Card, Avatar, Space, Button, Input } from "antd";
import type { ReplyItem } from "../types/forum.types";

import { useAuthStore } from "src/store/authStore";
import { useCreateReply, useUpvoteReply } from "../hooks/useForum.hook";

const { TextArea } = Input;

interface Props {
  reply: ReplyItem;
  topicId: string;
}

export default function ReplyNode({ reply, topicId }: Props) {
  const { user } = useAuthStore();

  const createReply = useCreateReply(topicId);
  const upvoteReply = useUpvoteReply(topicId);

  const [text, setText] = useState("");
  const [openReplyBox, setOpenReplyBox] = useState(false);

  // 🔥 Show / hide children replies
  const [showChildren, setShowChildren] = useState(false);

  const submitReply = () => {
    if (!text.trim()) return;

    createReply.mutate({
      topicId,
      content: text,
      userId: String(user?.id),
      parentId: reply.id,
    });

    setText("");
    setOpenReplyBox(false);
  };

  return (
    <div style={{ marginLeft: reply.parent_id ? 40 : 0, marginTop: 12 }}>
      <Card
        style={{
          marginBottom: 12,
          borderRadius: 12,
          background: "white",
          border: "1px solid #f0f0f0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        }}
      >
        <Space align="start">
          <Avatar src={reply.user_id.avatar}>{reply.user_id.name[0]}</Avatar>

          <div style={{ flex: 1 }}>
            <b>{reply.user_id.name}</b>
            <p style={{ marginTop: 4 }}>{reply.content}</p>

            <Space>
              {/* Like */}
              <Button
                type="link"
                onClick={() =>
                  upvoteReply.mutate({
                    replyId: reply.id,
                    userId: String(user?.id),
                  })
                }
              >
                👍 {reply.upvotes.length}
              </Button>

              {/* Reply button */}
              <Button
                type="link"
                onClick={() => setOpenReplyBox(!openReplyBox)}
              >
                Reply
              </Button>

              {/* Hide / Show children */}
              {reply.replies.length > 0 && (
                <Button
                  type="link"
                  onClick={() => setShowChildren(!showChildren)}
                >
                  {showChildren
                    ? "Hide replies"
                    : `Show ${reply.replies.length} replies`}
                </Button>
              )}
            </Space>

            {/* Reply Input */}
            {openReplyBox && (
              <div style={{ marginTop: 10 }}>
                <TextArea
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  type="primary"
                  style={{ marginTop: 6 }}
                  onClick={submitReply}
                >
                  Send
                </Button>
              </div>
            )}

            {/* Children Replies */}
            {showChildren && reply.replies.length > 0 && (
              <div style={{ marginTop: 12, marginLeft: 30 }}>
                {reply.replies.map((child) => (
                  <ReplyNode key={child.id} reply={child} topicId={topicId} />
                ))}
              </div>
            )}
          </div>
        </Space>
      </Card>
    </div>
  );
}
