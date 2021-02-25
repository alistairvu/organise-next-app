import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../actions/userActions"

interface UserInfo {
  id: string
  name: string
  email: string
}

const initialState = { userInfo: {} as UserInfo, loading: false, error: "" }

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logoutUser: () => initialState,

    resetError: (state) => {
      state.error = ""
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, () => ({
      ...initialState,
      loading: true,
    }))

    builder.addCase(loginUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
    }))

    builder.addCase(loginUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))

    builder.addCase(registerUser.pending, () => ({
      ...initialState,
      loading: true,
    }))

    builder.addCase(registerUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
    }))

    builder.addCase(registerUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))
  },
})

const { actions, reducer: userReducer } = userSlice
export const { logoutUser, resetError } = actions
export default userReducer
