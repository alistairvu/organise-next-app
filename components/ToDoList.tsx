import useToDo from "../zustand/useTodo"
import { ToDoItem } from "./ToDoItem"
import {
  Heading,
  Box,
  Flex,
  Spacer,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react"
import useUser from "../zustand/useUser"
import { useEffect } from "react"
import { ToDoInput } from "./ToDoInput"

export const ToDoList = () => {
  const userInfo = useUser((state) => state.userInfo)
  const [loading, syncing, error, toDoItems, fetchToDo] = useToDo((state) => [
    state.loading,
    state.syncing,
    state.error,
    state.toDoItems,
    state.fetchToDo,
  ])

  useEffect(() => {
    fetchToDo(userInfo.id)
  }, [userInfo.id])

  return (
    <Center>
      <Box
        w={{ base: "90vw", md: "60vw" }}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
      >
        <Flex align="center">
          <Heading py={4}>Welcome!</Heading>
          <Spacer />
          {loading && (
            <>
              <Spinner color="green" size="sm" mr="3" />
              <Text>Loading...</Text>
            </>
          )}
          {syncing && (
            <>
              <Spinner color="green" size="sm" mr="3" />
              <Text>Syncing...</Text>
            </>
          )}
        </Flex>

        {toDoItems.map((todo) => (
          <ToDoItem key={todo._id} {...todo} />
        ))}
        <ToDoInput />
      </Box>
    </Center>
  )
}
