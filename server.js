const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const  connectedDB= require("./db");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

const userSchema= new mongoose.Schema(
    {
        name:{ type:String,
               required:true,
               trim:true
        },
        email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim:true

        },
        password:{
            type:String,
            required:true,
        },
    },
    
);
const User= mongoose.model("User",userSchema);
app.post("/signup", async(requestAnimationFrame,res)=>{
    try{
    const {name,email,passord}=requestAnimationFrame.body;
     if(!name || !email || !passord){
        return res,status(400).json({
            message:"Name, email, and password are required"

        });
        
     }
     if(password.length<6){
        return res.status (400).json({
            message:"Password must be as lest 6 characters long ",
        });
     }
     const existingUser = await User.findOne({ email });
      if(existingUser){
    return res.status(409).json ({
        message:"Email already exists",
    } );
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser=new User({
        name,
        email,
        password:hashedPassword,

      });
      await newUser.save();
      res.status(201).json({
        message:"User registed successfully",

     
      user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
         },
      });

    }catch(err){
        console.err("Signup error:", err);
        res.status(500).json({
            message:"Server error "
        });
    }
    });
app.post("/login", async(requestAnimationFrame,res)=>{
    try{
        cost{email,passord}=requestAnimationFrame.body;
        if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
       const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
          const isMatch = await bcrypt.compare(password, user.password);
if(!is isMatch){
    retun res.status(401).json({
        message:"Invalid password",
},
   
    });
catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
const PORT = process.env.PORT || 5000;
   app.listen(PORT, ()=>){
    console.log('Server is running on part ${port}');
   });

 
    
    
