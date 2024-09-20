import React from "react";
import ClientPage from "@/components/chat/ClientPage";
import { ChatProvider } from "@/components/context/ChatContext";

const Page: React.FC<{ params: { groupId: string } }> = async ({ params }) => {
  const { groupId } = params;

  try {
    // Fetch group details based on groupId
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/${groupId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch group details');
    }
    const groupDetails = await response.json();

    return (
		<ChatProvider>
      <ClientPage groupId={groupId} groupDetails={groupDetails} />

		</ChatProvider>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    return <div>Error loading group details</div>;
  }
};

export default Page;
