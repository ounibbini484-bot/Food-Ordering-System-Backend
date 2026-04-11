import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

//SignupRoute
router.post("/signup", async(request, response) =>{
    //signup logic
    try {
    const {name,email,password}=request.body;

     if(!name || !email || !password){
        return response.status(400).json({message:"Name, email, and password are required "});
     }

     if(password.length<6){
        return response.status (400).json({message:"Password must be as lest 6 characters long"});
     }

     const existingUser = await User.findOne({ email });
      if(existingUser){
        return response.status(409).json ({ message:"Email already exists"});
      }

      const hashedPassword = await bcrypt.hash(password,10);

      const newUser = await User.create({name, email, password:hashedPassword});
   

      response.status(201).json({
        message:"User registed successfully",
        newUser: newUser
      });

        
    } catch (error) {
        console.log("Signup Error: ", error);
        return response.status(500).json({message: "Something went wrong"});
        
    }
})

//LoginRoute
// router.post("/login", async(request, response)=>{
//     //login logic
// })

export default router;