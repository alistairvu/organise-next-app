import create, { State } from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"
import mongoose from "mongoose"

interface ToDoItem {
  _id: string
  content: string
  isCompleted: boolean
  user: string
}

interface ToDoState extends State {
  loading: boolean
  syncing: boolean
  error: string
  toDoItems: Array<ToDoItem>

  fetchToDo: (userId: string) => void
  addToDo: (content: string, userId: string) => void
  updateToDo: (item: ToDoItem) => void
  deleteToDo: (id: string) => void
}

const initialState = {
  loading: false,
  syncing: false,
  error: "",
  toDoItems: [] as Array<ToDoItem>,
}

const useToDo = create<ToDoState>(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchToDo: async (userId: string) => {
        try {
          set({ ...initialState, loading: true })
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }

          const { data } = await axios.get(`/api/user/${userId}`, config)
          const { toDoItems } = data
          console.log(data)
          set({ ...initialState, toDoItems })
        } catch (err) {
          set({ ...initialState, error: err.response.data.message })
        }
      },

      addToDo: async (content: string, userId: string) => {
        try {
          const itemId = mongoose.Types.ObjectId()

          const newItem = {
            _id: itemId.toString(),
            content: content,
            isCompleted: false,
            user: userId,
          }
          console.log(newItem)
          set((state) => ({
            toDoItems: [...state.toDoItems, newItem],
            syncing: true,
          }))

          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
          const pushItem = {
            id: userId,
            itemId: itemId,
            content,
          }
          const { status } = await axios.post("/api/todo/add", pushItem, config)
          if (status === 200) {
            set({ syncing: false })
          }
        } catch (err) {
          console.log(err)
          set((state) => ({
            ...initialState,
            toDoItems: state.toDoItems,
            error: err.response.data.message,
          }))
        }
      },

      updateToDo: async (item: ToDoItem) => {
        try {
          console.log(item)
          const prevItems = get().toDoItems
          const newItems = prevItems.map((todo) => {
            if (todo._id === item._id) {
              return item
            }
            return todo
          })

          set({ toDoItems: newItems, syncing: true })
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
          const { status } = await axios.put(
            `/api/todo/${item._id}`,
            { content: item.content, isCompleted: item.isCompleted },
            config
          )
          if (status === 200) {
            set({ syncing: false })
          }
        } catch (err) {
          set((state) => ({
            ...initialState,
            toDoItems: state.toDoItems,
            error: err.response.data.message,
          }))
        }
      },

      deleteToDo: async (id: string) => {
        try {
          const prevItems = get().toDoItems
          const newItems = prevItems.filter((todo) => todo._id !== id)

          set({ toDoItems: newItems, syncing: true })
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
          const { status } = await axios.delete(`/api/todo/${id}`, config)
          if (status === 200) {
            set({ syncing: false })
          }
        } catch (err) {
          set((state) => ({
            ...initialState,
            toDoItems: state.toDoItems,
            error: err.response.data.message,
          }))
        }
      },
    }),
    "todo"
  )
)

export default useToDo
