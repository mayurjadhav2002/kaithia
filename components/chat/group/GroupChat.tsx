import React from "react";
import { useChat } from "@/components/context/ChatContext";
import { useUser } from "@/components/context/AppContext";

const GroupChat: React.FC = () => {
  const { messages } = useChat();
  const { userData } = useUser(); // Assuming userData contains the current user's ID

  return (
    <div className='w-full px-3 overflow-hidden pt-3'>
      <div className='grid pb-11'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2.5 ${
              message.user === userData?._id ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.user !== userData?._id && (
              <img
                src='/avatar.jpg'
                alt='User Avatar'
                className='w-10 h-10 rounded-full'
              />
            )}
            <div className='grid'>
              <h5
                className={`text-gray-900 text-sm font-semibold leading-snug pb-1 ${
                  message.user === userData?._id ? 'text-right' : ''
                }`}
              >
                {message.user === userData?._id ? 'You' : message.user}
              </h5>
              <div
                className={`w-auto grid ${
                  message.user === userData?._id ? 'text-right' : ''
                }`}
              >
                <div
                  className={`px-3.5 py-2 rounded ${
                    message.user === userData?._id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <h5 className='text-sm font-normal leading-snug'>
                    {message.content}
                  </h5>
                </div>
                <div className='justify-end items-center inline-flex'>
                  <h6
                    className={`text-gray-500 text-xs font-normal leading-4 ${
                      message.user === userData?._id ? 'text-right' : ''
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </h6>
                </div>
              </div>
            </div>
            {message.user === userData?._id && (
              <img
                src='/avatar.jpg'
                alt='User Avatar'
                className='w-10 h-10 rounded-full'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChat;
