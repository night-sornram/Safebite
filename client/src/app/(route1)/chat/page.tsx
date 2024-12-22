"use client";
import { Image } from "antd";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "nutritionist";
}

export default function ChatPagePreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the chat! you can ask me anything.",
      sender: "nutritionist",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    const newNutritionistMessage: Message = {
      id: Date.now() + 1,
      text: `You said: ${inputMessage}`,
      sender: "nutritionist",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newUserMessage,
      newNutritionistMessage,
    ]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-full  bg-gray-100 rounded-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex items-center ${
              message.sender === "user" ? "justify-end" : "justify-start gap-3"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full overflow-hidden ${
                message.sender === "user" ? "hidden" : "block"
              }`}
            >
              <Image
                src="/images/cat.jpg"
                alt="cat"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            </div>
            <div
              className={`
                max-w-[70%] p-3 rounded-lg 
                ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t p-4 flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:border-2 focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white h-full p-2 rounded-r-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
