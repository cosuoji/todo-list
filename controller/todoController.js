import * as  toDoService from "../services/todoService.js"
import client from "../integrations/redis.js"

export const getAllTodos = async(req, res) =>{
    try{

        //check cache
        const cacheKey = "/todos"

        //get data from Cache
        const data = await client.get(cacheKey)

        if(data){
            console.log("returning data from cache")
            return res.json({
                data: JSON.parse(data),
                error: null
            })
        }


        
        const result = await toDoService.getAllTodos()

        //set cache
        await client.setEx(cacheKey, 600, JSON.stringify(result))

        console.log("returning data from database")
        res.render("todos.ejs", {listOfTodos: result.toDoList, arrayOfIds: result.toDoIdArray, todostate: result.toDoState})
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
     await client.del("/todos")
     res.render("todos.ejs", {listOfTodos: result.data.todos.toDoList, arrayOfIds: result.data.todos.toDoIdArray, todostate: result.data.todos.toDoState})
      
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
}

export const updateToDo = async(req, res)=>{
    try {
        const toDoToUpdate = req.body.todoId;
        const {text} = req.body
        const result = await toDoService.updateToDo(toDoToUpdate, text)
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

export const markCompleted = async(req, res) =>{
    try{
        const toDoToMarkCompleted = req.body.todoId
        const completedToggle = req.body.completed;
        //console.log(completedToggle)
        const result = await toDoService.markCompleted(toDoToMarkCompleted, completedToggle)
        //console.log(result.lastOne.toDoState)
        res.render("todos.ejs", {listOfTodos: result.lastOne.toDoList, arrayOfIds: result.lastOne.toDoIdArray, todostate: result.lastOne.toDoState})
        //res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}