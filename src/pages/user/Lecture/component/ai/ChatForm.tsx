import { ArrowUpOutlined } from "@ant-design/icons";
import { useRef } from "react";
import type { ChatMessageItem } from "src/types/chat.types";
interface ChatFormProps {
  chatHistory: ChatMessageItem[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageItem[]>>;
  generateBotResponse: (history: ChatMessageItem[]) => Promise<void>;
}

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;

    if (inputRef.current) inputRef.current.value = "";

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add thinking indicator
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
    }, 600);

    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
        ref={inputRef}
      />
      <button type="submit" className="material-symbols-rounded">
        <ArrowUpOutlined />
      </button>
    </form>
  );
};

export default ChatForm;
