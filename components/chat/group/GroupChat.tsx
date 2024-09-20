import React, { useEffect, useRef } from "react";
import { useChat } from "@/components/context/ChatContext";
import { useUser } from "@/components/context/AppContext";
import moment from "moment";

const GroupChat: React.FC = () => {
  const { messages } = useChat();
  const { userData } = useUser();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    const now = moment();
    const messageTime = moment(timestamp);

    if (now.isSame(messageTime, "day")) {
      return messageTime.fromNow();
    } else if (now.isSame(messageTime, "year")) {
      return messageTime.format("MMM D [at] h:mm A");
    } else {
      return messageTime.format("MMM D, YYYY [at] h:mm A");
    }
  };

  const isSameUserAsPrevious = (index: number) => {
    if (index === 0) return false;
    console.log("Index:", index, "Messages:", messages[index].user);
    return messages[index].user === messages[index - 1].user;
  };

  return (
    <div className="w-full h-[calc(100%-11rem)] fixed overflow-auto scrollbar-hidden">
      <div className="w-full px-3 pt-3 flex flex-col">
        <div className="flex-1 overflow-auto">
          {messages.map((message, index) => {
            const isCurrentUser = message.user === userData?.username || message.user === userData?._id;
            const showAvatar = !isCurrentUser && !isSameUserAsPrevious(index);
            const isSameUser = isSameUserAsPrevious(index);

            return (
              <div
                key={message.id}
                className={`flex gap-2.5 ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {showAvatar ? (
                  <img
                    src="/avatar.jpg"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6"></div>
                )}
                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                  {!isSameUser && (
                    <h5
                      className={`text-gray-900 text-sm font-semibold leading-snug pb-1 ${isCurrentUser ? "text-right" : "text-left"}`}
                    >
                      {isCurrentUser ? "You" : message.user}
                    </h5>
                  )}
                  <div
                    className={`w-auto grid ${isCurrentUser ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`px-3.5 py-2 rounded ${isCurrentUser ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
                    >
                      <h5 className="text-sm font-normal leading-snug">
                        {message.content}
                      </h5>
                    </div>
                    <div className="inline-flex mb-2">
                      <h6
                        className={`text-gray-400 text-[0.6rem] font-normal leading-4 ${isCurrentUser ? "text-right" : "text-left"}`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </h6>
                    </div>
                  </div>
                </div>
                {isCurrentUser && !isSameUser && (
                  <img
                    src="/avatar.jpg"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
