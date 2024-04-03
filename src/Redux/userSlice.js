import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ref, set, get } from "firebase/database";
import database from '../firebase/firebase';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {
      username: '',
      email: '',
    },
    loggedIn: false
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    }
  }
})

export const { setInfo, setLoggedIn } = userSlice.actions;
export const selectInfo = (state) => state.user.info;
export const selectLoggedIn = (state) => state.user.loggedIn;
export const selectUId = (state) => state.user.uid;

export default userSlice.reducer;

//Action to upload user to database
export const addUser = (userData, userId) => async (dispatch) => {
  try {
    const userRef = ref(database, `users/${userId}`);

    await set(userRef, userData);
    dispatch(setInfo(userData));
  } catch (error) {
    console.error("Error uploading data", error);
  }
}

//Action to set logged in user
export const setUser = (userId) => async (dispatch) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      dispatch(setInfo(userData));
      dispatch(setLoggedIn(true));
    }
  } catch (error) {
    console.error("Error getting user", error);
  }
}

//Signout 
export const signOutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(setInfo(''));
  dispatch(setLoggedIn(false));
}