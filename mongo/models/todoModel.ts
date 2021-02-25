import { Document, Schema, model, models } from "mongoose"

interface ToDoSchema extends Document {
  content: string
  isCompleted: boolean
  user: string
}

export const toDoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      required: true,
    },
    isCompleted: { type: Boolean, required: true },
  },
  { timestamps: true }
)

const ToDo = models.ToDo || model<ToDoSchema>("ToDo", toDoSchema)

export default ToDo
