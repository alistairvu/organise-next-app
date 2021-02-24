import { connect, connection } from "mongoose"
import type { NextApiRequest, NextApiResponse } from "next"

const connectDB = () => {
  if (connection.readyState >= 1) {
    return
  }

  return connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

    useCreateIndex: true,
  })
}

export default connectDB
