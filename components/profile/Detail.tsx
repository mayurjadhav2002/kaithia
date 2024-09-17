"use client"
import Link from "next/link";
import React from "react";
import Button from "../Button";
import { useUser } from "../context/AppContext";

const Detail = () => {
	const {userData, profileData} = useUser();
	return (
		<div className='px-6 mt-3 '>
			<div className='space-y-2'>
				<h3 className='text-2xl font-bold flex items-center'>
				{userData?.first_name ? `${userData?.first_name} ${userData?.last_name}` : "MJ"}{" "}
					<span className='p-1.5 bg-green-500 ml-3 rounded-full'></span>
				</h3>
				<p className='text-md font-medium flex items-center gap-2 flex-wrap '>
					🌍 <span className='text-blue-700'>@{userData?.username}</span>
				</p>
				<p className='text-md '>{profileData?.bio}</p>
				<div className='flex items-center justify-between flex-wrap'>
					<p className='text-md text-gray-600 dark:text-gray-400 font-semibold '>
						Joined September 2024
					</p>
					<Link href={"/"} className='text-blue-700 font-semibold'>
						https://mayurjadhav.tech
					</Link>
				</div>
				<div className='flex py-3 -space-x-2'>
					<img
						className='inline-block size-8 rounded-full ring-2 ring-white '
						src='/avatar.jpg'
						alt='Avatar'
					/>
					<img
						className='inline-block size-8 rounded-full ring-2 ring-white '
						src='/avatar.jpg'
						alt='Avatar'
					/>
				</div>

				<div className='flex space-x-3'>
					<Button link='/edit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							className='bi bi-pen w-4 h-4'
							viewBox='0 0 16 16'
						>
							<path d='M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5' />
						</svg>
						<span className='text-md'>Share</span>
					</Button>
					<Button link='/edit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							className='bi bi-pen w-4 h-4'
							viewBox='0 0 16 16'
						>
							<path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z' />
						</svg>
						<span className='text-md'>Edit</span>
					</Button>
				</div>
			</div>

			<hr className='my-4  text-gray-300' />

			<div className='space-y-3'>
				<h4 className='text-md font-semibold'>About me</h4>
				<p className='text-gray-800 '>
					If you have Telegram, you can contact
					@cacdq2esdasdafafadsaddsadsad right away.
				</p>
			</div>

			<hr className='my-5 text-gray-300' />

			<div className='space-y-4'>
				<h4 className='text-md font-medium'>Links</h4>
				<div className='flex justify-between items-center '>
					<div className='flex items-start gap-2'>
						<div className='p-2 border-[1px] rounded-md'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								className='bi bi-pen w-6 h-6'
								viewBox='0 0 16 16'
							>
								<path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z' />
								<path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z' />
							</svg>
						</div>

						<div className='flex flex-col justify-between'>
							<p className='text-md font-semibold'>
								Add social links{" "}
							</p>
							<p className='text-xs'>
								{" "}
								<span className='text-green-600'>+20</span>{" "}
								Points
							</p>
						</div>
					</div>

					<Link
						href={"/"}
						className='text-violet-700 font-semibold text-sm'
					>
						+ Add
					</Link>
				</div>
			</div>

			<hr className='mt-6 mb-4 text-gray-300' />

			<div className='space-y-4'>
				<h4 className='text-md font-medium'>Experiences</h4>
				<div className='flex justify-between items-center '>
					<div className='flex items-start gap-2'>
						<div className='p-2 border-[1px] rounded-md'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								className='bi bi-pen w-6 h-6'
								viewBox='0 0 16 16'
							>
								<path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z' />
								<path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z' />
							</svg>
						</div>

						<div className='flex flex-col justify-between'>
							<p className='text-md font-semibold'>
								Add Experience{" "}
							</p>
							<p className='text-xs'>
								{" "}
								<span className='text-green-600'>+20</span>{" "}
								Points
							</p>
						</div>
					</div>

					<Link
						href={"/"}
						className='text-violet-700 font-semibold text-sm'
					>
						+ Add
					</Link>
				</div>
			</div>

			<hr className='mt-6 mb-4 text-gray-300' />
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h4 className='text-md font-semibold'>Skills</h4>
					<Link
						href={"/"}
						className='text-violet-700 font-semibold text-sm'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='bi bi-pencil-fill w-4 h-4'
							viewBox='0 0 16 16'
						>
							<path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z' />
						</svg>
					</Link>
				</div>
				<div className='flex justify-start items-center gap-1 flex-wrap '>
					<p className='px-2 py-1.5 text-md font-medium border-[1px] rounded-lg'>
						Javascript
					</p>
					<p className='px-2 py-1.5 text-md font-medium border-[1px] rounded-lg'>
						Python
					</p>

					<p className='px-2 py-1.5 text-md font-medium border-[1px] rounded-lg'>
						React
					</p>

					<p className='px-2 py-1.5 text-md font-medium border-[1px] rounded-lg'>
						Node
					</p>
					<p className='px-2 py-1.5 text-md font-medium border-[1px] rounded-lg'>
						RestAPI
					</p>
				</div>
			</div>
		</div>
	);
};

export default Detail;
