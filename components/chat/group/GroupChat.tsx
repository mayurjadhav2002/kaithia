import React from "react";

const GroupChat = () => {
	return (
		<div className='w-full px-3 overflow-hidden pt-3 '>
			<div className='grid pb-11'>
				<div className='flex gap-2.5 '>
					<img
						src='/avatar.jpg'
						alt='Shanay image'
						className='w-10 h-10 rounded-full'
					/>
					<div className='grid'>
						<h5 className='text-gray-900 text-sm font-semibold leading-snug pb-1'>
							Shanay cruz
						</h5>
						<div className='w-auto grid'>
							<div className='px-3.5 py-2 bg-gray-100 rounded justify-start text-wrap  items-center gap-3 inline-flex'>
								<h5 className='text-gray-900 text-sm font-normal leading-snug'>
									Guts, I need a review of work. Are you
									ready?
								</h5>
							</div>
							<div className='justify-end items-center inline-flex '>
								<h6 className='text-gray-500 text-xs font-normal leading-4 '>
									05:14 PM
								</h6>
							</div>
						</div>
						<div className='w-max grid'>
							<div className='px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex'>
								<h5 className='text-gray-900 text-sm font-normal leading-snug'>
									Let me know
								</h5>
							</div>
							<div className='justify-end items-center inline-flex'>
								<h6 className='text-gray-500 text-xs font-normal leading-4 '>
									05:14 PM
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex gap-2.5 justify-end '>
				<div className=''>
					<div className='grid '>
						<h5 className='text-right text-gray-900 text-sm font-semibold leading-snug pb-1'>
							You
						</h5>
						<div className='px-3 py-2 bg-indigo-600 rounded'>
							<h2 className='text-white text-sm font-normal leading-snug'>
								Yes, let’s see, send your work here
							</h2>
						</div>
						<div className='justify-start items-center inline-flex'>
							<h3 className='text-gray-500 text-xs font-normal leading-4 py-1'>
								05:14 PM
							</h3>
						</div>
					</div>
					<div className='justify-center'>
						<div className='grid w-fit ml-auto'>
							<div className='px-3 py-2 bg-indigo-600 rounded '>
								<h2 className='text-white text-sm font-normal leading-snug'>
									Anyone on for lunch today
								</h2>
							</div>
							<div className='justify-start items-center inline-flex'>
								<h3 className='text-gray-500 text-xs font-normal leading-4 '>
									You
								</h3>
							</div>
						</div>
					</div>
				</div>
				<img
					src='/avatar.jpg'
					alt='Hailey image'
					className='w-10 h-10 rounded-full'
				/>
			</div>
			
		</div>
	);
};

export default GroupChat;
