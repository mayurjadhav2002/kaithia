import React from 'react'
const Avatar = () => {
  return (
    <>
     <img src={'/background.jpeg'} alt={"background image"} className='w-full h-36'  />   
     <img className="w-16 h-16 rounded-full ms-6 -mt-8" src="/avatar.jpg" alt="Rounded avatar"/>
    </>
  )
}

export default Avatar