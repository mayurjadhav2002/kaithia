"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

const BottomTabs = () => {
	const pathname = usePathname();

	return (
		<div className='grid grid-cols-2 w-full max-w-full fixed bottom-0 bg-white dark:bg-gray-900 h-14  border-[1px] border-gray-200 '>
			<Link
				href='/profile'
				className={`w-full flex justify-evenly flex-col items-center ${
					!pathname?.startsWith("/chat") ? "text-violet-600" : ""
				}`}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					className='bi bi-person-circle w-5 h-5 mt-1'
					viewBox='0 0 16 16'
				>
					<path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
					<path
						fill-rule='evenodd'
						d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
					/>
				</svg>
				<p className='text-xs'> My Profile</p>
			</Link>

			<Link
				href='/chat'
				className={`w-full flex justify-evenly flex-col items-center ${
					pathname?.startsWith("/chat") ? "text-violet-600" : ""
				}`}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					fill='currentColor'
					className='bi bi-person-circle w-5 h-5 mt-1'
					viewBox='0 0 16 16'
				>
					<path d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z' />
				</svg>
				<p className='text-xs'> Chat</p>
			</Link>
		</div>
	);
};

export default BottomTabs;
