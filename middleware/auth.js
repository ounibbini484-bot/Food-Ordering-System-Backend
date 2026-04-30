import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token){
            return res.status(401).json({message: "Authentication failed"});
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET||"testSecret")
        req.userId = decodedData?.id;

        next();
    } catch (error) {
        console.error("Auth Middleware Error", error);
        res.status(401).json({message: "Authentication failed. Invalid token"});
        
    }
};

export default auth