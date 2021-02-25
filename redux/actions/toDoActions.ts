import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { rootState } from "../index"
import mongoose from "mongoose"

interface ToDoItem {
  _id: string
  content: string
  isCompleted: boolean
  user: string
}

export const fetchToDos = createAsyncThunk(
  "toDos/fetchTodos",
  async (_, thunkApi) => {
    try {
      const { id: userId } = (thunkApi.getState() as rootState).user.userInfo
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.get(`/api/user/${userId}`, config)
      const { toDoItems } = data
      return toDoItems
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const addToDo = createAsyncThunk(
  "toDos/addToDo",
  async (
    {
      rawId,
      content,
      user,
    }: {
      rawId: mongoose.Types.ObjectId
      content: string
      user: string
    },
    thunkApi
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const pushItem = {
        id: user,
        itemId: rawId,
        content,
      }
      const { status, data } = await axios.post(
        "/api/todo/add",
        pushItem,
        config
      )
      if (status === 200) {
        return data
      }
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const updateToDo = createAsyncThunk(
  "toDo/updateToDo",
  async (item: ToDoItem, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { status, data } = await axios.put(
        `/api/todo/${item._id}`,
        { content: item.content, isCompleted: item.isCompleted },
        config
      )
      if (status === 200) {
        return data
      }
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const deleteToDo = createAsyncThunk(
  "toDo/deleteToDo",
  async (id: string, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { status, data } = await axios.delete(`/api/todo/${id}`, config)
      if (status === 200) {
        return data
      }
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)
