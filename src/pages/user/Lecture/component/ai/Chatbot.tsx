import { useEffect, useState, useRef } from "react";
import "src/pages/user/Lecture/component/ai/index.css";
import axios from "axios";
import ChatbotIcon from "src/pages/user/Lecture/component/ai/ChatbotIcon";
import ChatMessage from "src/pages/user/Lecture/component/ai/ChatMessage";
import ChatForm from "src/pages/user/Lecture/component/ai/ChatForm";
import { CloseOutlined } from "@ant-design/icons";
import type { ChatMessageItem } from "src/types/chat.types";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageItem[]>([]);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const generateBotResponse = async (history: ChatMessageItem[]) => {
    const updateHistory = (text: string) => {
      setChatHistory((prev: ChatMessageItem[]) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    try {
      const contents = history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        { contents },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
        }
      );

      const botText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
        "Sorry, I couldn’t generate a response.";

      updateHistory(botText);
    } catch (error) {
      console.error("Error generating bot response:", error);
      updateHistory("⚠️ Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show" : ""}`}>
      <button onClick={() => setShowChatbot(!showChatbot)} id="chatbot-toggler">
        <span className="material-symbols-rounded">
          <ChatbotIcon />
        </span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h3>ChatBot</h3>
            <p>Online</p>
          </div>
          <button onClick={() => setShowChatbot(false)}>
            <CloseOutlined />
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 🧐 <br /> How can I assist you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
