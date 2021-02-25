import { connect, connection, models } from "mongoose"
import User from "./models/userModel"
import ToDo from "./models/todoModel"

const connectDB = () => {
  if (connection.readyState >= 1) {
    return
  }

  models.ToDo = ToDo
  models.User = User

  return connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

    useCreateIndex: true,
  })
}

export default connectDB
