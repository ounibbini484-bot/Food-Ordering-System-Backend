import jwt from "jsonwebtoken"
import User from "../models/User.js";

const adminAuth = async (req, res, next) => {
    try {
        if(!req.userId){
            return res.status(401).json({message: "Unauthorized"});
        }

        const user = await User.findOne(req.userId);

        if(!user || !user.isAdmin){
            return res.status(403).json({message: "Access denied"});
        }

        next();
    } catch (error) {
        console.error("Admin Auth Middleware Error", error);
        res.status(401).json({message: "Authentication failed. Admin verficiation failed"});
        
    }
};

export default adminAuth