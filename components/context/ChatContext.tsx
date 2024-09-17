"use client"
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import io from "socket.io-client";
import { useUser } from "./AppContext";

interface ChatMessage {
	id: string;
	user: string;
	content: string;
	timestamp: string;
}

interface ChatContextType {
	messages: ChatMessage[];
	addMessage: (message: ChatMessage) => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) {
	throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

const socket = io(backendUrl);

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { userData, groupId } = useUser();
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	useEffect(() => {
		if (userData?._id) {
			socket.emit("authenticate", userData._id);
		}

		if (groupId) {
			socket.emit("joinGroup", groupId);
		}

		socket.on("receiveMessage", (newMessage: ChatMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, [groupId, userData]);

	const addMessage = (message: ChatMessage) => {
		setMessages((prevMessages) => [...prevMessages, message]);
	};

	return (
		<ChatContext.Provider value={{ messages, addMessage }}>
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
