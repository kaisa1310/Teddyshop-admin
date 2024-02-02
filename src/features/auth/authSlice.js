import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authSerice } from './authService'

const userDefaultState = JSON.parse(localStorage.getItem('user_data')) || null

const initialState = {
  user: userDefaultState,
  isError: false,
  isLoading: false,
  isSuceess: false,
  status: '',
  message: ''
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authSerice.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuceess = true
        state.state = action.payload.status
        state.user = action.payload.data
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuceess = false
        state.user = null
      })
  }
})

export default authSlice.reducer
