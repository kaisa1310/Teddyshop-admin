import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import memberSlice from '../features/members/memberSlice'
import uploadSlice from '../features/upload/uploadSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    member: memberSlice,
    upload: uploadSlice
  }
})
