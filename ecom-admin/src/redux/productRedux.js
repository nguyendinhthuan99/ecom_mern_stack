import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get
    getProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getProductSuccsess: (state, action) => {
      state.isFetching = false
      state.products = action.payload
    },
    getProductFailue: (state) => {
      state.isFetching = false
      state.error = true
    },
    //Delete
    deleteProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    deleteProductSuccsess: (state, action) => {
      state.isFetching = false
      state.products.splice(
        state.products.findIndex(item => item._id === action.payload),
        1
      )
    },
    deleteProductFailue: (state) => {
      state.isFetching = false
      state.error = true
    },
    //Update
    updateProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    updateProductSuccsess: (state, action) => {
      state.isFetching = false
      state.products[
        state.products.findIndex((item) =>
          item.id === action.payload.id
        )] = action.payload.product
    },
    updateProductFailue: (state) => {
      state.isFetching = false
      state.error = true
    },
    //Create
    createProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    createProductSuccsess: (state, action) => {
      state.isFetching = false
      state.products.push(action.payload)
    },
    createProductFailue: (state) => {
      state.isFetching = false
      state.error = true
    },
  }
})

export const {
  //get
  getProductStart,
  getProductFailue,
  getProductSuccsess,
  //delete
  deleteProductStart,
  deleteProductFailue,
  deleteProductSuccsess,
  //update
  updateProductStart,
  updateProductFailue,
  updateProductSuccsess,
  //create
  createProductStart,
  createProductFailue,
  createProductSuccsess,
} = productSlice.actions

export default productSlice.reducer
