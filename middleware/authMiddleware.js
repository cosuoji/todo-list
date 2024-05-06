import jwt from "jsonwebtoken"
import { tokenToUse } from "../controller/authController.js"
export let emailId, userId;

export const authMiddleware = (req, res, next) =>{
    // set the retrieved token to authorization
    const authorization = tokenToUse;


    if(!authorization){
        return res.status(401).json({message: "Not Authorized to make or view todos"})
    }

    //verify the token 
    
    let JWT_SECRET="secret"

    jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }

        
        req.user = decoded
        emailId = decoded.email
        userId = decoded._id
        next();
    })
}




