import User from "../database/schema/userSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (email, password) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(!user){
        throw new ErrorWithStatus("user not found, 404")
    }

    //Check if password works

    if(!bcrypt.compareSync(password, user.password)){
        throw new ErrorWithStatus("username or password incorrect", 400)
    }

    //Generate the JWT Token
    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({
        email: user.email,
        _id: user._id,
        sub: user._id
    },

        //Set it to expire in an hour
        JWT_SECRET, {expiresIn: "1hr"}   
)
        return{
            message: "Login Successful",
            data: {
                accessToken: token,
                //user: user,
            }
        }

}

export const register = async (first_name, last_name, email, password) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(user){
        throw new ErrorWithStatus("user already exists", 400)
    }

    password = await bcrypt.hash(password, 10);

    const newUser = new User({
        first_name, last_name, email, password
    })

    await newUser.save()
    delete newUser.password;

    return {
        message: "User created successfully",
    //   //  data: {
    //         user: newUser
    //     }
    }

}

