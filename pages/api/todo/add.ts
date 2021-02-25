import connectDB from "../../../mongo"
import ToDo from "../../../mongo/models/todoModel"
import User from "../../../mongo/models/userModel"
import type { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"

const addItem = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, itemId, content } = req.body
    connectDB()

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "No matching users found" })
    }

    const newItem = new ToDo({
      _id: mongoose.Types.ObjectId(itemId),
      content: content,
      isCompleted: false,
      user: user._id,
    })
    await newItem.save()

    user.toDoItems.push(newItem._id)
    await user.save()
    return res.json(user.toDoItems)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "An error occurred" })
  }
}

export default addItem
