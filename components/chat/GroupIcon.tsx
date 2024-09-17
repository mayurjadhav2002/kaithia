import React from 'react';

interface GroupDetails {
	group_name: string;
	group_description: string;
  // Add other fields if needed, such as avatarUrl, description, etc.
}

interface GroupIconProps {
  groupDetails?: GroupDetails; // groupDetails is optional in case it's not provided
}

const GroupIcon: React.FC<GroupIconProps> = ({ groupDetails }) => {
	console.log("groupDetails", groupDetails)
  return (
    <div className='sticky bg-white w-full flex top-0 h-14 items-center justify-between px-3 py-2 border-2'>
      <div className='flex items-start gap-3'>
        <img className='w-10 h-10 rounded-lg' src='/avatar.jpg' alt='Group Avatar' />
        <div className='w-full flex items-start flex-col'>
          <p className='font-medium text-md'>{groupDetails?.group_name || 'Group Name'}</p>
          <p className='text-xs text-gray-500'>{groupDetails?.group_description || ''
		  }</p>
        </div>
      </div>
    </div>
  );
};

export default GroupIcon;
