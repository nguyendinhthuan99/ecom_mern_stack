import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
      state.error = true
    },
    loginSuccsess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },
    loginFailue: (state) => {
      state.isFetching = true
      state.error = true
    },
  }
})

export const { loginStart, loginSuccsess, loginFailue } = userSlice.actions
export default userSlice.reducer
