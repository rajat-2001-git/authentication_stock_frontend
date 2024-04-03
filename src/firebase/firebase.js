import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyChmHQDqVpTnp7GP4UVqRECb1Vyi-8vHv4",
  authDomain: "authentication-react-f0907.firebaseapp.com",
  projectId: "authentication-react-f0907",
  storageBucket: "authentication-react-f0907.appspot.com",
  messagingSenderId: "597741707889",
  appId: "1:597741707889:web:d26852b4d00559642231d0",
  measurementId: "G-1EME942G78",
  databaseURL: "https://authentication-react-f0907-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database as default };