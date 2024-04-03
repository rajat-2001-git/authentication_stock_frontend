import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./Auth/forms/SignUp";
import Login from "./Auth/forms/Login";
import Stocks from './Root/Components/Stocks';
import AuthLayout from './Auth/AuthLayout';
import Subscription from './Root/Components/Subscription'
import Success from './Root/Components/Success';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* private routes */}
          <Route path="/stocks" element={<Stocks />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/success' element={<Success />}/>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
