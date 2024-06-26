import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import toDos from "../database/schema/todoSchema.js";



export const getAllTodos = async() =>{
  try{
    const userToDsiplay = await toDos.find({userId: userId})
    const listOfTodos = [];
    const listOfTodoIds =[];
    const toDoStates = []
    //console.log(userToDsiplay)
    
    //loop through the ToDo's and push the to the array
    for(let i = 0; i < userToDsiplay.length; i++){
        listOfTodos.push(userToDsiplay[i].todo)
    }  

    //loop through the ToDo's and push ids the to the array
    for(let i = 0; i < userToDsiplay.length; i++){
        listOfTodoIds.push(userToDsiplay[i]._id.toHexString())
    }  
    
    //loop through the ToDo's states(completed) the to the array
    for(let i = 0; i < userToDsiplay.length; i++){
        toDoStates.push(userToDsiplay[i].completed)
    }  
    

    return {
        toDoList: listOfTodos,
        toDoIdArray: listOfTodoIds,
        toDoState: toDoStates, 
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

export const updateToDo = async (toDoToUpdate, text) =>{
    try{
        const toDoChecker = await toDos.findOne({_id: toDoToUpdate})
        //console.log(toDoChecker)

        if(!toDoChecker){
            throw new ErrorWithStatus("todo not found", 400)
        }

        if(toDoChecker.userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        

        await toDos.findOneAndUpdate({_id:toDoToUpdate}, {todo: text})
        return {
            message: "Changes Saved",
            data:{
                body: toDoChecker,
                lastOne: await getAllTodos()
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

export const markCompleted = async(toDoToMarkCompleted, completedToggle) =>{
    try{
        const toDoChecker = await toDos.find({_id: toDoToMarkCompleted})
    
        if(toDoChecker.length < 1){
            throw new ErrorWithStatus("todo not found", 400)
        }

        if(toDoChecker[0].userId !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }


        await toDos.findOneAndUpdate({_id:toDoToMarkCompleted}, {completed: completedToggle})


        return {
            message: "Marked",
            completed: completedToggle,
            lastOne: await getAllTodos()
        }

    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}