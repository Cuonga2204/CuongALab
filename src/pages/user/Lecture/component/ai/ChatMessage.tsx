import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ChatbotIcon from "./ChatbotIcon";
import type { ChatMessageItem } from "src/types/chat.types";

interface ChatMessageProps {
  chat: ChatMessageItem;
}

const ChatMessage = ({ chat }: ChatMessageProps) => {
  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
    >
      {chat.role === "model" && <ChatbotIcon />}

      <div className="message-text">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            ul: ({ ...props }) => <ul className="my-list" {...props} />,
            strong: ({ ...props }) => (
              <strong className="font-bold" {...props} />
            ),
          }}
        >
          {chat.text || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
