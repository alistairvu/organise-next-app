import { Input } from "@chakra-ui/react"
import { useState } from "react"
import mongoose from "mongoose"
import { addToDo } from "../redux/actions/toDoActions"
import { useSelector, useDispatch } from "react-redux"
import { rootState } from "../redux"

export const ToDoInput = () => {
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  const id = useSelector((state: rootState) => state.user.userInfo.id)

  const createNewItem = (content: string) => {
    const rawId = new mongoose.Types.ObjectId()
    return { rawId, content, user: id }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit")
    e.preventDefault()
    console.log(content)
    if (content.trim()) {
      const newItem = createNewItem(content)
      dispatch(addToDo(newItem))
      setContent("")
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Input
        placeholder="Add item..."
        focusBorderColor="green"
        my={5}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
    </form>
  )
}
