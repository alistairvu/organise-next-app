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
import { deleteToDo, updateToDo } from "../redux/actions/toDoActions"
import { useDispatch } from "react-redux"

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
  const dispatch = useDispatch()

  const editHandler = () => {
    dispatch(
      updateToDo({
        _id,
        content: newContent,
        isCompleted: newCompleted,
        user: user,
      })
    )
  }

  const deleteHandler = () => {
    if (confirm("Are you sure?")) {
      dispatch(deleteToDo(_id))
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
