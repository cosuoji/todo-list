import mongoose from "mongoose";


const toDoSchema = mongoose.Schema({
    todo:{
     type: String, 
    }, 
    userId:{
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const toDos = mongoose.model("toDos", toDoSchema)
export default toDos