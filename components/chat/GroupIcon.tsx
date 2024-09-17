import React from "react";

const GroupIcon = () => {
	return (
		<div className='sticky bg-white w-full flex top-0 h-14 items-center justify-between px-3 py-2 border-2'>
			<div className='flex items-start gap-3'>
				<img className='w-10 h-10 rounded-lg ' src='/avatar.jpg' />
				<div className='w-full flex items-start flex-col'>
					<p className='font-medium text-md'>Mayur {"<>"} User </p>

					<p className='text-xs text-gray-500'>You, mayur8908</p>
				</div>
			</div>
		</div>
	);
};

export default GroupIcon;
