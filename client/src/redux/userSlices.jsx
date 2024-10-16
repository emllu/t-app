import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentuser: null, // Initialize as an empty object
 token: " ", // Initialize as an empty object
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinstart: (state) => {
      state.loading = true;
      state.error = null;
    },
    settoken:(state,action)=>{
state.token=action.payload
    }
,
    signinsuccess: (state, action) => {
      console.log('Action payload:', action.payload); // Add this for debugging
      state.currentuser = action.payload;
      state.loading = false;
    },

    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
  signoutSuccess:(state)=>{
    state.currentUser=null;
    state.loading=false
    state.error=null
    state.token=null
  }
});

export const { signinstart, signinFailure, signinsuccess,settoken,
   updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,signoutSuccess } = userSlice.actions;

export default userSlice.reducer;

