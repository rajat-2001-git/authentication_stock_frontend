import React from 'react'
import Button from '../Reusables/Button'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ username, handleSignOut }) => {
  const navigate = useNavigate();

  const handleSubscription = () => {
    navigate('/subscription');
  }
  
  return (
    <div className='flex justify-between items-center px-2 bg-black h-[70px] py-2 w-full'>
      <h1 className='text-xl text-white font-bold'>Welcome, {username}</h1>
      <div className='flex justify-start gap-2'>
        <Button text='Subscription' style='bg-yellow-300' onClick={handleSubscription} />
        <Button text='Sign out' style='bg-blue-700 text-white' onClick={handleSignOut} />
      </div>
    </div>
  )
}

export default Navbar