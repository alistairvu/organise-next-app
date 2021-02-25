import connectDB from "../../../mongo"
import User from "../../../mongo/models/userModel"
import type { NextApiRequest, NextApiResponse } from "next"

const fetchUserInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    connectDB()

    const user = await User.findById(id).populate(
      "toDoItems",
      "isCompleted content"
    )

    if (!user) {
      return res.status(404).json({ message: "No matching users found" })
    }

    return res.json(user)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "An error occurred" })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return fetchUserInfo(req, res)
  }
  res.status(400).send(`Cannot ${req.method} this route.`)
}

export default handler
