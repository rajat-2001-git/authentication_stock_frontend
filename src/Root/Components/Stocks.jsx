import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectInfo, signOutUser, setUser } from '../../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Chart from '../Shared/Chart';
import socket from '../../websocket/websocket';
import { selectStockData, updateStockData } from '../../Redux/stockSlice';

const Stocks = () => {
  const stockData = useSelector(selectStockData);
  const user = useSelector(selectInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      dispatch(setUser(uid));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleSocketMessage = (event) => {
      const receivedData = JSON.parse(event.data);
      dispatch(updateStockData(receivedData));
    };

    socket.onmessage = handleSocketMessage;

    return () => {
      // Clean up the event handler when the component unmounts
      socket.onmessage = null;
    };
  }, [dispatch]);

  const handleSignOut = () => {
    try {
      dispatch(signOutUser());
      navigate('/');
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <>
      <Navbar username={user.username} handleSignOut={handleSignOut} />
      <div className='flex flex-col items-center mt-[100px] gap-2'>
        <h1 className='pl-[100px] text-xl font-bold text-green-800'>NABIL</h1>
        <Chart data={stockData} />
      </div>
    </>
  );
};

export default Stocks;
