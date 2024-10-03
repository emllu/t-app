import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlices'
import themeReducer from './themeSlice';
export const store = configureStore({
  reducer: {
    user:userReducer,
    theme:themeReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})