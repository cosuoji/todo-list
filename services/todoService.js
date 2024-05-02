import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import toDos from "../database/schema/todoSchema.js";


export const getAllTodos = async() =>{
  try{
    const userToDsiplay = await User.findOne({_id: userId})
   
    return {
        toDoList: userToDsiplay.list
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const addToDo = async(newItem) =>{
    try{
      const userToUpdate = await User.findOne({_id: userId})
      let toDoUser = userToUpdate._id.toHexString()
      
      const newToDo = new toDos({toDo: newItem, userId: toDoUser})
      await newToDo.save()

      return {
        message: "todo added",
        data:{
            todos: newToDo
        }
      }
      
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const updateToDo = async (toDoToUpdate, updatedTask) =>{
    try{
        const toDoChecker = await toDos.findOne({_id: toDoToUpdate})
        //console.log(toDoChecker)

        if(!toDoChecker){
            throw new ErrorWithStatus("todo not found", 400)
        }

        if(toDoChecker.userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        toDoChecker.toDo = updatedTask;
        await toDos.findOneAndUpdate({_id:toDoToUpdate}, {toDo: updatedTask})
        return {
            message: "Changes Saved",
            data:{
                body: toDoChecker.toDo
            }
        }
        
        
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }

}

export const deleteToDo = async(toDoToDelete) =>{
    try{    
        const toDoChecker = await toDos.find({_id: toDoToDelete})
        if(toDoChecker.length < 1){
            throw new ErrorWithStatus("todo not found", 400)
        }

        if(toDoChecker.userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        await toDos.findOneAndDelete({_id: toDoToDelete})
        return {
            message: "Blog Deleted",
            toDo: toDoChecker,
        }

    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}