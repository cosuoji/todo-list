//import toDos from "../database/schema/todoSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";


export const getAllTodos = async() =>{
  try{
    const toDoList = await User.find({userId: userId})
    return {
        data: toDoList
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const addToDo = async(newItem) =>{
    try{
      const userToUpdate = await User.findOne({_id: userId})
      userToUpdate.list.push(newItem)
      await userToUpdate.save();

      return {
        message: "todo added",
        data:{
            todos: userToUpdate.list
        }
      }
      
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}