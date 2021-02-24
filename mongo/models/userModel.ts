import { Document, Schema, model, models } from "mongoose"

interface UserSchema extends Document {
  name: string
  email: string
  password: string
  toDoItems: string[]
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    toDoItems: [{ type: Schema.Types.ObjectId, ref: "ToDo" }],
  },
  { timestamps: true }
)

const User = models.User || model<UserSchema>("User", userSchema)

export default User
