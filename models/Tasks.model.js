import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
)

const Task = mongoose.models?.Task || mongoose.model("Task", taskSchema)
export default Task
