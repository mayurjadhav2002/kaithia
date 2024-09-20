"use client";
import React, {useEffect, useState} from "react";

interface UserDetails {
	userId: string;
	phone_number: string;
	username: string;
	password: string;
	phone_code_hash: string;
	otp: string;
}
const validatePhoneNumber = (number: string) => {
	const cleanedNumber = number.replace(/[^0-9+]/g, "");
	const isValid = /^\+\d{1,3}\d{10,}$/.test(cleanedNumber);
	return {isValid, cleanedNumber};
};
const SignUp = () => {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		userId: "",
		phone_number: "",
		username: "",
		password: "",
		phone_code_hash: "",
		otp: "",
	});
	const [otpSent, setOtpSent] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [response, setResponse] = useState({msg: ""});
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [passwordType, setPasswordType] = useState<boolean>(true);
	const [pageloading, setPageLoading] = useState<boolean>(true);
	useEffect(() => {
		if (window.Telegram && window.Telegram.WebApp) {
			const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
			if (userId) {
				setUserDetails({...userDetails, userId});
				const isLoggedIn = localStorage.getItem("loggedIn");
				if (isLoggedIn) {
					setLoggedIn(true);
				}
			} else {
				setResponse({msg: "Unable to retrieve Telegram user ID"});
			}
			setPageLoading(false);
		}
	}, [userDetails]);

	const handleRequestOtp = async () => {
		const {isValid, cleanedNumber} = validatePhoneNumber(
			userDetails.phone_number
		);

		if (!isValid) {
			setResponse({
				msg: "Please enter a valid phone number with country code (e.g., +919876543210)",
			});
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_FLASK_APP}/request_otp`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phone_number: cleanedNumber,
						password: userDetails.password,
						userId: userDetails.userId,
					}),
				}
			);
			const data = await res.json();
			if (data.success) {
				setOtpSent(true);
				setUserDetails({
					...userDetails,
					phone_code_hash: data.phone_code_hash,
					phone_number: cleanedNumber,
				});
				setResponse({msg: "OTP sent successfully"});
			} else if (data.message === "Phone number already authorized.") {
				setLoggedIn(true);
				localStorage.setItem("loggedIn", "true");
				setResponse({msg: "You're already logged in"});
			} else {
				setResponse({msg: data.message});
			}
		} catch (error) {
			setResponse({msg: "Error: Could not connect to the server"});
		} finally {
			setLoading(false);
		}
	};

	const handleJoinAccount = async () => {
		if (!userDetails.otp || userDetails.otp.length < 3) {
			setResponse({msg: "Please enter a valid OTP"});
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_FLASK_APP}/verify_otp`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phone_number: userDetails.phone_number,
						otp: userDetails.otp,
						phone_code_hash: userDetails.phone_code_hash,
						password: userDetails.password,
					}),
				}
			);
			const data = await res.json();
			if (data.success) {
				setResponse({msg: "Account created successfully"});
				setLoggedIn(true);
				localStorage.setItem("loggedIn", "true");
			} else {
				setResponse({msg: data.error || data.message});
			}
		} catch (error) {
			setResponse({msg: "Error: Could not connect to the server"});
		} finally {
			setLoading(false);
		}
	};

	const isLoggedIn =
		typeof window !== "undefined" && localStorage.getItem("loggedIn");

	if (isLoggedIn) {
		return <LoggedInComponent />;
	}

	return (
		<>
			<p className='text-left fixed text-gray-400 bottom-0 text-xs'>
				User: {userDetails.userId}
			</p>

			<div>
				{pageloading && (
					<div className='loadingScren'>
						<div className='loader'>
							<span className='loader-text'>loading</span>
							<span className='load'></span>
						</div>
					</div>
				)}

				{!loggedIn ? (
					<div className='mt-6 '>
						{!otpSent ? (
							<div>
								<label
									htmlFor='phone-input'
									className='block mb-2 text-sm font-medium text-gray-900'
								>
									Phone Number
								</label>
								<div className='relative mb-3'>
									<div className='relative'>
										<div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
											<svg
												className='w-6 h-6 text-purple-700'
												aria-hidden='true'
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												fill='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													fill-rule='evenodd'
													d='M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z'
													clip-rule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='text'
											id='phone-input'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
											onChange={(e) =>
												setUserDetails({
													...userDetails,
													phone_number:
														e.target.value,
												})
											}
											value={userDetails.phone_number}
											placeholder='Enter your phone number'
										/>
									</div>
									<p className='mt-1.5 text-xs text-gray-500'>
										Enter phone number with country code eg.
										<b>+91392492924</b>
									</p>
								</div>

								<label
									htmlFor='password-input'
									className='block mb-2 text-sm font-medium text-gray-900'
								>
									Password
								</label>
								<div className='relative mb-3'>
									<div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
										<svg
											className='w-6 h-6 text-purple-700'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												fill-rule='evenodd'
												d='M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z'
												clip-rule='evenodd'
											/>
										</svg>
									</div>

									<input
										type={
											passwordType ? "password" : "text"
										}
										id='password-input'
										className='bg-gray-50 z-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5'
										placeholder='Enter your password'
										onChange={(e) =>
											setUserDetails({
												...userDetails,
												password: e.target.value,
											})
										}
										value={userDetails.password}
									/>

									<div
										className='absolute z-30 inset-y-0 end-0 top-0 flex items-center pe-3.5 cursor-pointer'
										onClick={() =>
											setPasswordType(!passwordType)
										}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='w-5 h-5 text-gray-700'
											viewBox='0 0 16 16'
										>
											<path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z' />
											<path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0' />
										</svg>
									</div>
								</div>
								<p className='mt-1 text-xs text-gray-500'>
									Enter password if you{"'"}ve enabled{" "}
									<b>2fa </b>
									else leave it <b>empty</b>
								</p>

								<button
									type='button'
									onClick={handleRequestOtp}
									className={`w-full mt-6 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 
                ${
					(!userDetails.phone_number ||
						userDetails.phone_number.length < 10) &&
					"bg-gray-300 cursor-not-allowed"
				}`}
									disabled={
										!userDetails.phone_number ||
										userDetails.phone_number.length < 10
									}
								>
									{loading
										? "We're Requesting OTP..."
										: "Request OTP"}
								</button>
							</div>
						) : (
							<div>
								<label
									htmlFor='otp-input'
									className='block mb-2 text-sm font-medium text-gray-900'
								>
									OTP
								</label>
								<input
									type='text'
									id='otp-input'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' // Match with others
									placeholder='Enter OTP'
									onChange={(e) =>
										setUserDetails({
											...userDetails,
											otp: e.target.value,
										})
									}
									value={userDetails.otp}
								/>

<p className='mt-1 text-xs text-gray-500'>
									Check your Telegram for the OTP
								</p>
								<button
									type='button'
									onClick={handleJoinAccount}
									className={`w-full mt-6 mb-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}
								>
									{loading
										? "Creating Account..."
										: "Verify OTP"}
								</button>
								<button
									className=' flex items-center  bg-transparent border-0 text-sm mt-2 text-purle-700'
									onClick={() => setOtpSent(!otpSent)}
								>
								 <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-arrow-left-short h-5 w-6" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg>	Edit Phone / Password
								</button>
							</div>
						)}
						{response.msg && (
							<p className='text-red-500 mt-10'>{response.msg}</p>
						)}
					</div>
				) : (
					<LoggedInComponent />
				)}
			</div>
		</>
	);
};

const LoggedInComponent = () => {
	return (
		<p className='px-3 mt-6 text-center font-bold text-3xl text-violet-600'>
			You{"'"}re already logged in!
		</p>
	);
};

export default SignUp;
