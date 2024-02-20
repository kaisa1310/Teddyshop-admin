import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { productService } from './productService'

const initialState = {
  products: [],
  product: {},
  createdProduct: {},
  updatedProduct: {},
  deletedProduct: {},

  prices: [],
  price: {},
  createdPrice: {},
  updatedPrice: {},
  deletedPrice: {},

  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getProducts = createAsyncThunk('product/getProducts', async (thunkAPI) => {
  try {
    return await productService.getProducts()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProductById = createAsyncThunk('product/getProduct', async (id, thunkAPI) => {
  try {
    return await productService.getProductById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createProduct = createAsyncThunk('product/createProduct', async (productData, thunkAPI) => {
  try {
    return await productService.createProduct({
      name: productData?.name,
      description: productData?.description,
      priceSale: productData?.priceSale,
      price: productData?.price,
      quantity: productData?.quantity,
      warranty: productData?.warranty,
      brand: productData?.brand,
      category: productData?.category,
      images: productData?.images,
      tags: productData?.tags,
      createdBy: productData?.createdBy
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (productData, thunkAPI) => {
  console.log(productData)
  try {
    return await productService.updateProduct(productData.id, {
      name: productData?.name,
      description: productData?.description,
      priceSale: productData?.priceSale,
      price: productData?.price,
      quantity: productData?.quantity,
      warranty: productData?.warranty,
      brand: productData?.brand,
      category: productData?.category,
      images: productData?.images,
      tags: productData?.tags
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
  try {
    return await productService.deleteProduct(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const addPriceToProduct = createAsyncThunk('product/addPrice', async (priceData, thunkAPI) => {
  try {
    return await productService.addPriceToProduct({
      productId: priceData.productId,
      price: priceData.price,
      quantity: priceData.quantity,
      color: priceData?.color,
      type: priceData?.type,
      size: priceData?.type
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getPriceByProductId = createAsyncThunk('product/getPriceByProductId', async (productId, thunkAPI) => {
  try {
    return await productService.getPriceByProductId(productId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products = action.payload.products
      })
      .addCase(getProducts.rejected, (state) => {
        state.isError = true
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdProduct = action.payload.product
      })
      .addCase(createProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedProduct = action.payload
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedProduct = action.payload
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(addPriceToProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addPriceToProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdPrice = action.payload.price
        state.message = action.payload.message
      })
      .addCase(addPriceToProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(getPriceByProductId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPriceByProductId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.prices = action.payload.prices
      })
      .addCase(getPriceByProductId.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default productSlice.reducer
