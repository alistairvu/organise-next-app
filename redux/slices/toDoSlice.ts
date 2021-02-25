import { createSlice } from "@reduxjs/toolkit"
import {
  fetchToDos,
  addToDo,
  updateToDo,
  deleteToDo,
} from "../actions/toDoActions"

interface ToDoItem {
  _id: string
  content: string
  isCompleted: boolean
  user: string
}

const initialState = {
  loading: false,
  syncing: false,
  error: "",
  toDoItems: [] as Array<ToDoItem>,
}

const toDoSlice = createSlice({
  name: "toDo",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, () => ({
      ...initialState,
      loading: true,
    }))
    builder.addCase(fetchToDos.fulfilled, (_, action) => ({
      ...initialState,
      toDoItems: action.payload,
    }))
    builder.addCase(fetchToDos.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))

    builder.addCase(addToDo.pending, (state, action) => {
      state.loading = false
      state.error = ""
      state.syncing = true
      const { rawId, content, user } = action.meta.arg
      const newItem = {
        _id: rawId.toString(),
        content: content,
        isCompleted: false,
        user: user,
      }
      state.toDoItems.push(newItem)
    })
    builder.addCase(addToDo.fulfilled, (state) => {
      state.syncing = false
    })
    builder.addCase(addToDo.rejected, (state, action) => {
      state.syncing = false
      state.error = action.payload as string
    })

    builder.addCase(updateToDo.pending, (state, action) => {
      state.loading = false
      state.error = ""
      state.syncing = true
      const newItem = action.meta.arg
      state.toDoItems = state.toDoItems.map((item) => {
        if (item._id === newItem._id) {
          return newItem
        }
        return item
      })
    })
    builder.addCase(updateToDo.fulfilled, (state) => {
      state.syncing = false
    })
    builder.addCase(updateToDo.rejected, (state, action) => {
      state.syncing = false
      state.error = action.payload as string
    })

    builder.addCase(deleteToDo.pending, (state, action) => {
      state.loading = false
      state.error = ""
      state.syncing = true
      const id = action.meta.arg
      state.toDoItems = state.toDoItems.filter((item) => item._id !== id)
    })
    builder.addCase(deleteToDo.fulfilled, (state) => {
      state.syncing = false
    })
    builder.addCase(deleteToDo.rejected, (state, action) => {
      state.syncing = false
      state.error = action.payload as string
    })
  },
})

const { reducer: toDoReducer } = toDoSlice
export default toDoReducer
