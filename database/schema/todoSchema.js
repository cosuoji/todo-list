import mongoose from "mongoose";


const toDoSchema = mongoose.Schema({
    toDo:{
     type: String, 
     required: true,
    }, 
    userId:{
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const toDos = mongoose.model("ToDos", toDoSchema)
export default toDos