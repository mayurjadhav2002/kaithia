import SignUp from '@/components/join/SignUp';
import React from 'react';

const page = () => {
  return (
    <div className=' w-full pt-10 flex flex-col justify-center items-center'>
      <div className='space-y-4 mb-6'>

     
      <h1 className='text-2xl font-semibold text-center'>Create an Account</h1>
      <p className='text-sm text-gray-600 text-center'>
        Please connect your Telegram account with <b>@Kaithia</b>  by entering the correct details you used for Telegram
      </p>
      </div>
      <SignUp />
    </div>
  );
}

export default page;
