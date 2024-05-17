import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import toDos from "../database/schema/todoSchema.js";


export const getAllTodos = async() =>{
  try{
    const userToDsiplay = await toDos.find({userId: userId})
    const listOfTodos = [];
    const listOfTodoIds =[]
    //console.log(userToDsiplay)
    
    //loop through the ToDo's and push the to the array
    for(let i = 0; i < userToDsiplay.length; i++){
        listOfTodos.push(userToDsiplay[i].todo)
    }  

    //loop through the ToDo's and push ids the to the array
    for(let i = 0; i < userToDsiplay.length; i++){
        listOfTodoIds.push(userToDsiplay[i]._id.toHexString())
    }  
    

    return {
        toDoList: listOfTodos,
        toDoIdArray: listOfTodoIds
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const addToDo = async(todo) =>{
    try{
      const userToUpdate = await User.findOne({_id: userId})
      let toDoUser = userToUpdate._id.toHexString()
      
      const newToDo = new toDos({todo: todo, userId: toDoUser})
      await newToDo.save()
     

      return {
        message: "todo added",
        data:{
            todos: await getAllTodos(),
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

        if(toDoChecker[0].userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        await toDos.findOneAndDelete({_id: toDoToDelete})

        return {
            message: "Blog Deleted",
            todos: await getAllTodos(),
        }

    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const markCompleted = async(toDoToMarkCompleted) =>{
    try{
        let finalAnswer;
        const toDoChecker = await toDos.find({_id: toDoToMarkCompleted})
         if(toDoChecker.length < 1){
            throw new ErrorWithStatus("todo not found", 400)
        }

        if(toDoChecker[0].userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        if(toDoChecker[0].completed === false) finalAnswer = true 
        if(toDoChecker[0].completed === true) finalAnswer = false
        await toDos.findOneAndUpdate({_id:toDoToMarkCompleted}, {completed: finalAnswer})

        return {
            message: "Mark  Completed Changed",
            todos: await getAllTodos()
        }

    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}