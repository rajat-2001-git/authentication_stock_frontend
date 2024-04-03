import React from 'react'
import Button from '../Reusables/Button';
import axios from 'axios';

const Subscription = () => {

  const handleBuy = async () => {
    const payload = {
      "return_url": import.meta.env.VITE_SUCCESS_URL,
      "website_url": import.meta.env.VITE_WEBSITE_URL,
      "amount": 10000,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      "customer_info": {
        "name": "Rajat Joshi",
        "email": "example@gmail.com",
        "phone": "9811496763"
      }
    }
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);

    if(response) {
      window.location.href = `${response?.data?.data?.payment_url}`
    }
  }

  return (
    <div className='flex flex-col items-center pt-4 w-full h-[200px] gap-3 justify-center'>
      <h1 className='text-xl font-bold'>Pay Rs 100 for suscription</h1>
      <Button onClick={handleBuy} text='Pay via Khalti' style='bg-purple-700 text-white' />
    </div>
  )
}

export default Subscription