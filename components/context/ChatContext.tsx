"use client";
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

	// Fetch previous messages for the group
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

				const data = await response.json();
				setMessages(data.messages); 
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		if (groupId && messages && messages.length === 0) {
			fetchPreviousMessages();
		}

	}, [groupId, messages]);

	useEffect(() => {
		if (!userData?._id) {
			console.warn('User ID is not available');
			return;
		}

		if (!groupId) {
			console.warn('Group ID is not available');
			return;
		}
		socket.emit("authenticate", userData._id);
		console.log(`Authenticated user with ID: ${userData._id}`);

		if (groupId) {
			socket.emit("joinGroup", groupId);
			console.log(`Joined group with ID: ${groupId}`);
		}
	
	
		socket.on("receiveMessage", (newMessage: ChatMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, [groupId, userData?._id]);

	const addMessage = (message: ChatMessage) => {
		setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, message] : [message]);
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
