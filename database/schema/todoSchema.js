import mongoose from "mongoose";


const toDoSchema = mongoose.Schema({
    toDo:{
     type: String, 
     required: true,
    }, 
    userId:{
        type: String
    }
}, {timestamps: true})

const toDos = mongoose.model("ToDos", toDoSchema)
export default toDos