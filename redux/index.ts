import storage from "redux-persist/lib/storage"
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import userReducer from "./slices/userSlice"
import toDoReducer from "./slices/toDoSlice"

const rootReducer = combineReducers({ user: userReducer, toDo: toDoReducer })

const persistConfig = {
  key: "@persist/organise",
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

let persistor = persistStore(store)
export type rootState = ReturnType<typeof store.getState>
export { store, persistor }
