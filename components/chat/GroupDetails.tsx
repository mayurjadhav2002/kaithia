import Link from "next/link";
import React from "react";

const GroupDetails = () => {
	return (
		<div>
			<Link href={"/chat/19237287"} className='w-full px-3 py-2   flex items-start gap-3 overflow-hidden active:bg-violet-50 transition-all duration-300'>
				<img className='w-12 h-12 rounded-lg ' src='/avatar.jpg' />
				<div className='w-full'>
					<p className='font-medium text-md'>Mayur {"<>"} User </p>

					<div className='w-full   flex justify-between items-center'>
						<span className='text-xs text-gray-600'>
							Mayur: hello this is 💆‍♂️
						</span>

						<span className='text-xs right-0 text-gray-600'>
							11.49PM
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default GroupDetails;
