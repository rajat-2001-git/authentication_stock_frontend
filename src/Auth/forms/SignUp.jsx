import { useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { addUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      const user = userCredential.user;
      if (data) {
        const userData = {
          username: data.username,
          email: data.email
        }
        dispatch(addUser(userData, user.uid))
      }
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setLoading(false);
      if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("The password is too weak.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("The email address is taken.");
      } else {
        console.log(err.code);
        alert(err.code);
      }
    }
  }

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-[400px] h-[300px] bg-black text-white rounded-3xl font-mono shadow-2xl gap-6'>

        <h2 className='flex justify-center text-3xl font-bold text-white'>SIGN UP</h2>

        <form onSubmit={handleSignUp}>
          <div className="flex flex-col items-center gap-4">
            {success &&
              <div className="flex justify-center items-center text-white bg-gray-800 w-full text-sm font-mono font-semibold rounded-lg py-1 gap-2">
                <TiTick size={20} className='bg-green-600 rounded-full' />Sign Up Successful!
              </div>
            }
            {error &&
              <div className="flex justify-center items-center text-white bg-gray-800 w-full py-2 text-sm font-mono font-semibold rounded-lg gap-2">
                <RxCross2 size={20} className='bg-red-600 rounded-full' /><p>{error}</p>
              </div>
            }
            <input
              type="text"
              name="username"
              required
              placeholder='Username'
              value={data.username}
              onChange={handleInputChanges}
              className='pl-2 h-11 w-full text-white bg-transparent rounded-lg border-2 border-gray-400'
            />

            <input
              type="email"
              name="email"
              required
              placeholder='Email'
              value={data.email}
              onChange={handleInputChanges}
              className='pl-2 h-11 w-full text-white bg-transparent rounded-lg border-2 border-gray-400'
            />

            <input
              type="password"
              name="password"
              required
              placeholder='Password'
              value={data.password}
              onChange={handleInputChanges}
              className='pl-2 h-11 w-full text-white bg-transparent rounded-lg border-2 border-gray-400'
            />

            <button type='submit' className='bg-blue-500 text-white font-bold rounded-sm text-xl w-[395px] h-11 px-3 py-1'>{loading ? 'Loading...' : 'Sign Up'}</button>

            <div className='flex items-center gap-2'>
              <p className='text-sm text-gray-300'>Already have a account?</p>
              <Link to='/'><span className='text-lg border-2 rounded-md p-1'>Log in</span></Link>
            </div>
          </div>
        </form>
      </div >
    </div>
  )
}

export default SignUp