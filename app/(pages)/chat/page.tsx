import GroupDetails from "@/components/chat/GroupDetails";
import React from "react";
const page = () => {
	return (
        <>
        <p className="text-md px-3 py-2 font-medium text-gray-800">Groups</p>
        <hr />
        <GroupDetails/>
        </>
    );
};

export default page;
