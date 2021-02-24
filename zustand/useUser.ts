import create, { State } from "zustand"
import { devtools, persist } from "zustand/middleware"
import axios from "axios"
import Cookies from "js-cookie"

interface UserInfo {
  id: string
  name: string
  email: string
}

interface UserState extends State {
  userInfo: UserInfo
  loading: boolean
  error: string

  loginUser: (email: string, password: string) => void
  registerUser: (name: string, email: string, password: string) => void
  logoutUser: () => void
  resetError: () => void
}

const initialState = {
  userInfo: {} as UserInfo,
  loading: false,
  error: "",
}

const useUser = create<UserState>(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        logoutUser: () => {
          set(initialState)
          Cookies.remove("token")
        },

        resetError: () => set({ error: "" }),

        loginUser: async (email: string, password: string) => {
          try {
            set({ ...initialState, loading: true })

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
            set({ ...initialState, userInfo: userInfo })
            Cookies.set("token", token)
          } catch (err) {
            console.log(err.response.data.message)
            set({ ...initialState, error: err.response.data.message })
          }
        },

        registerUser: async (name: string, email: string, password: string) => {
          try {
            set({ ...initialState, loading: true })

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
            set({ ...initialState, userInfo: userInfo })
            Cookies.set("token", token)
          } catch (err) {
            console.log(err.response.data.message)
            set({ ...initialState, error: err.response.data.message })
          }
        },
      }),
      { name: "poll_user" }
    ),
    "poll_user"
  )
)

export default useUser
