import jwt from "jsonwebtoken"
import { tokenToUse } from "../controller/authController.js"
import blacklist from "../database/schema/blacklistSchema.js";
export let emailId, userId;
const JWT_SECRET="secret"

export const authMiddleware = async (req, res, next) =>{
    // set the retrieved token to authorization
    const authorization = tokenToUse;

    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});

    if(checkIfBlackListed){
        return res
            .status(401)
            .json({message: "This session has expired. Please login"})
    }


    if(!authorization){
        return res.status(401).json({message: "Not Authorized to make or view todos"})
    }

    //verify the token 
    
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




