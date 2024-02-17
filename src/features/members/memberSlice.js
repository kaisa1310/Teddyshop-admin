import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { memberService } from './memberService'

const initialState = {
  members: [],
  users: [],
  admins: [],
  member: {},
  createdMember: {},
  updatedMember: {},
  deletedMember: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getUsers = createAsyncThunk('member/getUsers', async (thunkAPI) => {
  try {
    return await memberService.getUsers()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getAdmins = createAsyncThunk('member/getAdmins', async (thunkAPI) => {
  try {
    return await memberService.getAdmins()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getMembers = createAsyncThunk('member/getMembers', async (thunkAPI) => {
  try {
    return await memberService.getMembers()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createMember = createAsyncThunk('member/createMember', async (memberData, thunkAPI) => {
  try {
    return await memberService.createMember({
      fullName: memberData?.fullName,
      position: memberData?.position,
      description: memberData?.description,
      images: memberData?.images,
      email: memberData?.email,
      phoneNumber: memberData?.phoneNumber,
      socialMedia: memberData.socialMedia,
      startWorkingDate: memberData?.startWorkingDate
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getMemberById = createAsyncThunk('member/getMemberById', async (id, thunkAPI) => {
  try {
    return await memberService.getMember(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateMember = createAsyncThunk('member/updateMember', async (memberData, thunkAPI) => {
  try {
    return await memberService.updateMember(memberData.id, {
      fullName: memberData?.fullName,
      position: memberData?.position,
      description: memberData?.description,
      images: memberData?.images,
      email: memberData?.email,
      phoneNumber: memberData?.phoneNumber,
      socialMedia: memberData.socialMedia,
      startWorkingDate: memberData?.startWorkingDate,
      endWorkingDate: memberData?.endWorkingDate
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteMember = createAsyncThunk('member/deleteMember', async (id, thunkAPI) => {
  try {
    return await memberService.deleteMember(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('RevertAll')

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state) => {
        state.isError = true
      })
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.admins = action.payload
      })
      .addCase(getAdmins.rejected, (state) => {
        state.isError = true
      })
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.members = action.payload
      })
      .addCase(getMembers.rejected, (state) => {
        state.isError = true
      })
      .addCase(createMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdMember = action.payload
      })
      .addCase(createMember.rejected, (state) => {
        state.isError = true
      })
      .addCase(getMemberById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.member = action.payload.member
      })
      .addCase(getMemberById.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedMember = action.payload
      })
      .addCase(updateMember.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedMember = action.payload
      })
      .addCase(deleteMember.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default memberSlice.reducer
