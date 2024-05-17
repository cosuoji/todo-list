import * as  toDoService from "../services/todoService.js"

export const getAllTodos = async(req, res) =>{
    try{
        const result = await toDoService.getAllTodos()
        res.render("todos.ejs", {listOfTodos: result.toDoList, arrayOfIds: result.toDoIdArray})
        //res.json({message: "Get all ToDo's", data: toDoList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


export const addToDo = async(req, res) =>{
    try{
    
     const {todo} = req.body
     const result = await toDoService.addToDo(todo);
     res.render("todos.ejs", {listOfTodos: result.data.todos.toDoList, arrayOfIds: result.data.todos.toDoIdArray})
      
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
}

export const updateToDo = async(req, res)=>{
    try {
        const toDoToUpdate = req.params.todoId;
        const {toDo} = req.body
        const updatedTask = toDo
        const result = await toDoService.updateToDo(toDoToUpdate, updatedTask)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const deleteToDo = async(req,res) =>{
    try{
        const toDoToDelete = req.body.todoId
        const result = await toDoService.deleteToDo(toDoToDelete)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}