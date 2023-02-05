import { publicRequest } from "../common/request";
import { loginFailue, loginStart, loginSuccsess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart())

  try {
    const res = await publicRequest.post('/auth/login', user)

    dispatch(loginSuccsess(res.data))
  }
  catch (err) {
    dispatch(loginFailue())
  }
}