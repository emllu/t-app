import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentuser: null, // Initialize as an empty object
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

    signinsuccess: (state, action) => {
      console.log('Action payload:', action.payload); // Add this for debugging
      state.currentuser = action.payload;
      state.loading = false;
    },

    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinstart, signinFailure, signinsuccess } = userSlice.actions;

export default userSlice.reducer;

