import SignUp from '@/components/join/SignUp'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='px-3 space-y-3 mt-10 bg-white'>
      
      <h1 className='text-2xl font-semibold text-center'>Create an Account</h1>
      <p className='text-sm text-gray-600 text-center'>Please connect your Telegram account with Kaithia by entering the correct details you used for Telegram</p>
    <SignUp/>
    </div>
 
    </>
  )
}

export default page