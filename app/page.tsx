import SignUp from '@/components/join/SignUp'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='px-3 space-y-3 mt-10'>
      <h1 className='text-2xl font-semibold text-center'>Create an Account</h1>
      <p className='text-sm text-gray-600 text-center'>Please Integrate to your Telegram account with Kaithia. Enter the correct details to create your session and account</p>
    <SignUp/>
    </div>
 
    </>
  )
}

export default page