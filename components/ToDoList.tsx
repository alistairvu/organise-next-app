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
import { useEffect } from "react"
import { ToDoInput } from "./ToDoInput"
import { fetchToDos } from "../redux/actions/toDoActions"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"

export const ToDoList = () => {
  const userInfo = useSelector((state: rootState) => state.user.userInfo)
  const dispatch = useDispatch()
  const { loading, syncing, toDoItems } = useSelector(
    (state: rootState) => state.toDo
  )

  useEffect(() => {
    dispatch(fetchToDos())
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
