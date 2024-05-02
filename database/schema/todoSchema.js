import mongoose from "mongoose";


const toDoSchema = mongoose.Schema({
    userId:{
     type: String, 
    },
    list:{
    type:[String], 
    default: [],
    }
}, {timestamps: true})

const toDos = mongoose.model("ToDos", toDoSchema)
export default toDos