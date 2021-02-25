import connectDB from "../../../mongo"
import ToDo from "../../../mongo/models/todoModel"
import User from "../../../mongo/models/userModel"
import type { NextApiRequest, NextApiResponse } from "next"

const fetchToDoById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    connectDB()

    const todo = await ToDo.findById(id).populate("user", "name")

    if (!todo) {
      return res.status(404).json({ message: "No matching items found" })
    }

    return res.json(todo)
  } catch (err) {
    res.status(400).json({ message: "An error occurred" })
  }
}

const deleteToDoById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    connectDB()

    const todo = await ToDo.findById(id)

    if (!todo) {
      return res.status(404).json({ message: "No matching items found" })
    }

    const user = await User.findById(todo.user)

    if (!user) {
      return res.status(404).json({ message: "No matching users found" })
    }

    user.toDoItems.filter((item: any) => item.id !== id)
    await user.save()
    await todo.remove()
    res.json({ message: "Item deleted" })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "An error occurred" })
  }
}

const editToDo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { content, isCompleted } = req.body
    connectDB()

    const todo = await ToDo.findById(id)

    if (!todo) {
      return res.status(404).json({ message: "No matching items found" })
    }

    todo.content = content
    todo.isCompleted =
      isCompleted === undefined ? todo.isCompleted : isCompleted
    await todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "An error occurred" })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return fetchToDoById(req, res)
  }

  if (req.method === "DELETE") {
    return deleteToDoById(req, res)
  }

  if (req.method === "PUT") {
    return editToDo(req, res)
  }
}

export default handler
