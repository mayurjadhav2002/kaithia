import GroupChat from "@/components/chat/group/GroupChat";
import MessageInput from "@/components/chat/group/MessageInput";
import GroupIcon from "@/components/chat/GroupIcon";
import React from "react";

const page = () => {
	return (
		<>
			<GroupIcon />
			<div className=' h-[calc(100%-8rem)] overflow-x-hidden overflow-y-scroll'>
				<GroupChat />
			</div>
            <MessageInput/>
			
		</>
	);
};

export default page;
