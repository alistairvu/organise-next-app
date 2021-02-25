import { Input } from "@chakra-ui/react"
import useTodo from "../zustand/useTodo"
import { useState } from "react"
import useUser from "../zustand/useUser"

export const ToDoInput = () => {
  const [content, setContent] = useState("")
  const addToDo = useTodo((state) => state.addToDo)
  const id = useUser((state) => state.userInfo.id)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit")
    e.preventDefault()
    console.log(content)
    if (content.trim()) {
      addToDo(content, id)
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
