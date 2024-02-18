import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { brandService } from './brandService'

const initialState = {
  brands: [],
  brand: {},
  createdBrand: {},
  updatedBrand: {},
  deletedBrand: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getBrands = createAsyncThunk('brand/getBrands', async (thunkAPI) => {
  try {
    return await brandService.getBrands()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getBrandById = createAsyncThunk('brand/getBrand', async (id, thunkAPI) => {
  try {
    return await brandService.getBrandById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createBrand = createAsyncThunk('brand/createBrand', async (brandData, thunkAPI) => {
  try {
    return await brandService.createBrand({
      name: brandData?.name,
      description: brandData?.description,
      logo: brandData?.logo,
      productCategory: brandData?.productCategory
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateBrand = createAsyncThunk('brand/updateBrand', async (brandData, thunkAPI) => {
  try {
    return await brandService.updateBrand(brandData.id, {
      name: brandData?.name,
      description: brandData?.description,
      logo: brandData?.logo,
      productCategory: brandData?.productCategory
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (id, thunkAPI) => {
  try {
    return await brandService.deleteBrand(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.brands = action.payload.brands
      })
      .addCase(getBrands.rejected, (state) => {
        state.isError = true
      })
      .addCase(getBrandById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.brand = action.payload.brand
      })
      .addCase(getBrandById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdBrand = action.payload.brand
      })
      .addCase(createBrand.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedBrand = action.payload
      })
      .addCase(updateBrand.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedBrand = action.payload
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default brandSlice.reducer
