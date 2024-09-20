"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import io from "socket.io-client";
import { useUser } from "./AppContext";

interface BackendMessageResponse {
    _id: string;
    message: string;
	username?: string;
    sender: {_id: string, username: string };
    groupId: string;
    isRead: boolean;
    created_on: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ChatMessage {
    id: string;
	username: string;
    user: string;
    content: string;
    timestamp: string;
}

interface ChatContextType {
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    sendMessage: (message: ChatMessage) => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

const transformNewMessage = (message: BackendMessageResponse): ChatMessage => ({
    id: message._id,
	username: message.sender.username,
    user: message.sender._id,
    content: message.message,
    timestamp: message.created_on,
});

const socket = io(backendUrl);

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { userData, groupId } = useUser();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [hasFetchedMessages, setHasFetchedMessages] = useState(false);

    useEffect(() => {
        const fetchPreviousMessages = async () => {
            if (!groupId) {
                console.warn('Group ID is not available');
                return;
            }

            try {
                const response = await fetch(`${backendUrl}/api/messages/${groupId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch previous messages');
                }

                const data: BackendMessageResponse[] = await response.json();
                console.log("Fetched messages:", data);

                const mappedMessages: ChatMessage[] = data.map(transformNewMessage);
                setMessages(mappedMessages);
                setHasFetchedMessages(true);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (groupId && !hasFetchedMessages) {
            fetchPreviousMessages();
        }
    }, [groupId, hasFetchedMessages]);

    useEffect(() => {
        if (userData?._id && groupId) {
            socket.emit("authenticate", userData._id);
            socket.emit("joinGroup", groupId);

            socket.off("receiveMessage");
            socket.on("receiveMessage", (newMessage: BackendMessageResponse) => {
				console.log("New message:", newMessage);
                if (newMessage.sender) {

                    const transformedMessage = transformNewMessage(newMessage);
                    console.log("Received new message:", transformedMessage);
                    setMessages((prevMessages) => [...prevMessages, transformedMessage]);
                } else {
                    console.error("Received message with undefined sender username:", newMessage);
                }
            });

            return () => {
                socket.off("receiveMessage");
            };
        }
    }, [groupId, userData?._id]);

    const addMessage = (message: ChatMessage) => {
        console.log("Adding message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = (message: ChatMessage) => {
        const formattedMessage = {
            message: message.content,
            senderId: userData?._id,
            groupId
        };
        console.log("Sending message:", formattedMessage);
        socket.emit("sendMessage", formattedMessage);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }

    return context;
};
