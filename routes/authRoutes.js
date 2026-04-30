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
router.post("/login", async(request, response)=>{
    //login logic [email and password]
    try{
      const {email, password} = request.body;

      if (!email || !password){
        return response.status(400).json({
          message: "Email and password are required",
        });
      }

      //Check the user with given email
      const user = await User.findOne({email});

      if(!user){
        return response.status(404).json({
          message: "User with this email does not exists",
        })
      };

      //Check if this combination of email and password exists in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch){
        return response.status(401).json({
          message: "Incorrect password",
        })
      }

      response.status(200).json({
        message:"User sign in successfully",
        email: user.email,
      });
    }
    catch(error){
      console.log("Signin Error: ", error);
        return response.status(500).json({message: "Something went wrong"});
    }
})

export default router;