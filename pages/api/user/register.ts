import connectDB from "../../../mongo"
import User from "../../../mongo/models/userModel"
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "PUT") {
      return res.status(401).send(`Cannot ${req.method} /api/user/register`)
    }

    const { name, email, password } = req.body
    await connectDB()

    if (!(name && password && email)) {
      return res.status(400).json({ message: "Data not formatted properly" })
    }

    const existingUser = await User.findOne({
      email,
    })

    if (existingUser) {
      res.status(400).json({ message: "User already exists" })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const userPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: userPassword,
      toDoItems: [],
    })
    newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN)
    res.status(200).json({
      userInfo: { id: newUser._id, name: newUser.name, email: newUser.email },
      token: token,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Data not formatted properly" })
  }
}

export default registerUser
