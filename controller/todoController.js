import * as  toDoService from "../services/todoService.js"

export const getAllTodos = async(req, res) =>{
    try{
        const toDoList = await toDoService.getAllTodos()
        res.json({message: "Get all ToDo's", data: toDoList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


export const addToDo = async(req, res) =>{
    try{
     const {newItem} = req.body
     const result = await toDoService.addToDo(newItem);
     
     res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
}