import axios from "axios"
import Cookies from "js-cookie"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      )
      const { userInfo, token } = data
      Cookies.set("token", token)
      return userInfo
    } catch (err) {
      console.log(err.response.data.message)
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.put(
        "/api/user/register",
        { name, email, password },
        config
      )
      const { userInfo, token } = data
      Cookies.set("token", token)
      return userInfo
    } catch (err) {
      console.log(err.response.data.message)
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)
