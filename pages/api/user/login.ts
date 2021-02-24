import connectDB from "../../../mongo"
import User from "../../../mongo/models/userModel"
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(401).send(`Cannot ${req.method} /api/user/login`)
    }

    const { email, password } = req.body
    await connectDB()

    if (!(password && email)) {
      return res.status(400).json({ message: "Data not formatted properly." })
    }

    const user = await User.findOne({
      email,
    })

    if (!user) {
      res.status(400).json({ message: "Incorrect email or password." })
      return
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (matchPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
      res.status(200).json({
        userInfo: { id: user._id, name: user.name, email: user.email },
        token: token,
      })
    } else {
      res.status(400).json({ message: "Incorrect email or password." })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "An error occurred." })
  }
}

export default loginUser
