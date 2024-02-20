import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import memberSlice from '../features/members/memberSlice'
import uploadSlice from '../features/upload/uploadSlice'
import procatSlice from '../features/procat/procatSlice'
import brandSlice from '../features/brand/brandSlice'
import productSlice from '../features/product/productSlice'
import blogCatSlice from '../features/blogcat/blogcatSlice'
import blogSlice from '../features/blog/blogSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    member: memberSlice,
    upload: uploadSlice,
    procat: procatSlice,
    brand: brandSlice,
    product: productSlice,
    blogCat: blogCatSlice,
    blog: blogSlice
  }
})
