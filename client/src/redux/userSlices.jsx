import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentuser: null,
  error: null,
loading: false,


}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinstart : (state)=>{
       state.loading = true
        state.error = null
       
    },
    
   signinsuccess : (state,action)=>{
        state.currentuser = action.payload
        state.loading = false
    },
    signinFailure:(state,action)=>{
        state.error=action.payload
        state.loading=false
    }
   
  },
})

export const { signinstart, signinFailure ,signinsuccess } = userSlice.actions

export default userSlice.reducer
