"use client"; // This marks this file as a client component

import React from "react";
import GroupChat from "@/components/chat/group/GroupChat";
import MessageInput from "@/components/chat/group/MessageInput";
import GroupIcon from "@/components/chat/GroupIcon";
import { useUser } from "@/components/context/AppContext";

interface ClientPageProps {
  groupId: string;
  groupDetails: {
    id: string;
    name: string;
    description: string;
    group_name: string;
    group_description: string;
      };
}

const ClientPage: React.FC<ClientPageProps> = ({ groupId, groupDetails }) => {
  const { setGroupId } = useUser();
  React.useEffect(() => {
    setGroupId(groupId);
  }, [groupId, setGroupId]);

  return (
    <>
      <GroupIcon groupDetails={groupDetails} />
      <div className=' h-[calc(100%-8rem)] overflow-x-hidden overflow-y-scroll'>
        <GroupChat />
      </div>
      <MessageInput />
    </>
  );
};

export default ClientPage;
