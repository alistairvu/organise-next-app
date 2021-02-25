import {
  Flex,
  Spacer,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  CloseButton,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import useToDo from "../zustand/useTodo"
import { FiX } from "react-icons/fi"

interface ToDoItemProps {
  _id: string
  content: string
  isCompleted: boolean
  user: string
}

export const ToDoItem = ({
  _id,
  content,
  isCompleted,
  user,
}: ToDoItemProps) => {
  const [newContent, setNewContent] = useState(content)
  const [newCompleted, setNewCompleted] = useState(isCompleted)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [deleteToDo, updateToDo] = useToDo((state) => [
    state.deleteToDo,
    state.updateToDo,
  ])

  const editHandler = () => {
    updateToDo({
      _id,
      content: newContent,
      isCompleted: newCompleted,
      user: user,
    })
  }

  const deleteHandler = () => {
    if (confirm("Are you sure?")) {
      deleteToDo(_id)
    }
  }

  const checkboxEditHandler = () => {
    setNewCompleted((prev) => !prev)
  }

  useEffect(() => {
    editHandler()
  }, [newCompleted])

  const editableEditHandler = (newVal: string) => {
    setNewContent(newVal)
  }

  return (
    <Flex bg="white" color="black" align="center">
      <Checkbox isChecked={newCompleted} onChange={checkboxEditHandler} />
      <Editable
        value={newContent}
        onChange={editableEditHandler}
        onSubmit={editHandler}
        ml="3"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Spacer />
      <CloseButton onClick={deleteHandler} />
    </Flex>
  )
}
