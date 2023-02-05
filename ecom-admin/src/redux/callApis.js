import {
  loginFailue,
  loginStart,
  loginSuccsess
} from "./userSlice";
import {
  getProductStart, getProductFailue, getProductSuccsess,
  deleteProductStart, deleteProductFailue, deleteProductSuccsess,
  createProductStart, createProductFailue, createProductSuccsess,
  updateProductStart, updateProductFailue, updateProductSuccsess,
} from './productRedux'
import { publicRequest, userRequest } from "../common/requests";

export const login = async (dispatch, user) => {
  dispatch(loginStart())

  try {
    const res = await publicRequest.post('/auth/login', user)

    dispatch(loginSuccsess(res.data))

    return res.data
  }
  catch (err) {
    dispatch(loginFailue())
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductStart())

  try {
    const res = await publicRequest.get('/product')

    dispatch(getProductSuccsess(res.data))
  }
  catch (err) {
    dispatch(getProductFailue())
  }
}

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart())

  try {
    const res = await userRequest.delete(`/product/${id}`)

    if(res?.data) dispatch(deleteProductSuccsess(id))
    else dispatch(deleteProductFailue())
  }
  catch (err) {
    dispatch(deleteProductFailue())
  }
}

export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart())

  try {
    // const res = await userRequest.post(`/product/${id}`, )

    dispatch(updateProductSuccsess({ id, product }))
  }
  catch (err) {
    dispatch(updateProductFailue())
  }
}

export const addProduct = async (product, dispatch) => {
  dispatch(createProductStart())

  try {
    const res = await userRequest.post(`/product`, product)

    dispatch(createProductSuccsess(res.data))
  }
  catch (err) {
    dispatch(createProductFailue())
    console.log(err.message)
  }
}