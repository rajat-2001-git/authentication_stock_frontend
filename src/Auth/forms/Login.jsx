import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { selectInfo, setUser, addUser } from '../../Redux/userSlice';
import { RxCross2 } from "react-icons/rx";
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineFacebook, AiOutlineGithub } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const selectEmail = useSelector(selectInfo);
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [email, setEmail] = useState(selectEmail.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      setLoading(false);
      navigate('/stocks');
      localStorage.setItem('uid', user.uid);
      dispatch(setUser(user.uid));
    } catch (error) {
      setLoading(false);
      if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError("Invalid Email or Password");
      } else {
        setError("Login failed");
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        if (user) {
          const userData = {
            username: user.displayName,
            email: user.email
          }
          navigate('/stocks');

          localStorage.setItem('uid', user.uid);
          dispatch(addUser(userData, user.uid));
          dispatch(setUser(user.uid));
        }

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-[420px] h-[300px] bg-black text-white rounded-3xl font-mono shadow-2xl gap-6'>
        <h2 className='flex justify-center text-3xl font-bold text-white'>LOG IN</h2>

        <div className='flex flex-row justify-between gap-3'>
          <button onClick={handleLoginWithGoogle} className=' flex flex-row items-center bg-transparent text-white border-2 border-red-400 rounded-lg px-3 py-1 gap-2'><FcGoogle size={23} /><span className='font-bold text-md'>Google</span></button>

          <button onClick={() => { }} className=' flex flex-row items-center bg-transparent text-white border-2 border-blue-500 rounded-lg px-3 py-1 gap-2'><AiOutlineFacebook size={23} /><span className='font-bold text-md'>Facebook</span></button>

          <button onClick={() => { }} className=' flex flex-row items-center bg-transparent text-white border-2 border-gray-300 rounded-lg px-3 py-1 gap-2'><AiOutlineGithub size={23} /><span className='font-bold text-md'>Github</span></button>
        </div>

        <div className='flex justify-center items-center gap-3'>
          <hr className="flex-grow border-t border-gray-300" />
          <p className='font-bold'>OR</p>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col items-center gap-4">
          {error &&
            <div className="flex justify-center items-center text-white bg-gray-800 w-full py-2 text-sm font-mono font-semibold rounded-lg gap-2">
              <RxCross2 size={22} className='bg-red-600 p-1 rounded-full' /><p>{error}</p>
            </div>
          }

          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} className='pl-2 h-11 w-full text-white bg-transparent rounded-lg border-2 border-gray-400 '
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} className='pl-2 h-11 w-full text-white bg-transparent rounded-lg border-2 border-gray-400'
          />

          <button onClick={handleLogin} className='bg-white text-black font-bold rounded-sm text-xl w-[410px] h-11 px-3 py-1'>{loading ? 'Loading...' : 'LOG IN'}</button>

          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-300'>Don't have a account?</p>
            <Link to='/sign-up'><span className='text-lg border-2 rounded-md p-1'>Sign Up</span></Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login