import * as authService from "../services/authService.js"

//export the jwt token
export let tokenToUse

export const login = async (req, res, next)=>{
    try {
        const { email, password} = req.body;
        const token = await authService.login(email, password)
        tokenToUse = token.data.accessToken

        if(tokenToUse){
            req.header.authorization = "Bearer" + tokenToUse
        }
        
        
        res.redirect("/todos")

    //     res.json({
    //         message: "Login successful",
    //         data: {
    //         accessToken: token, 
    //   },
    // })
    ;
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {first_name, last_name,email, password} = req.body
    const result = await authService.register(first_name, last_name,email, password)
    res.redirect("/todos")
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}


export const logout = async(req, res) =>{
    try{
        const result = await authService.logout(tokenToUse);
        res.redirect("/")
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}