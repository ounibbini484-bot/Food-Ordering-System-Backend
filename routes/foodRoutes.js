import express from "express";
import auth from "../middleware/auth.js";
import Food from "../models/Food.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

//jwt --> json web token [use for login tracking]

router.get("/", auth, async(req, res) =>{
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        console.error("Fetch Foods Error", error);
        res.status(500).json({message: "Something went wrong with fetching food"});
    }
});

//Add a new food item [only an admin should be allowed to add a food item]

router.post("/", auth, adminAuth, async(req, res) =>{
    try {
        const {name, price, image, description} = req.body;

        if(!name || !price || !image || !description){
            return res.status(400).json({message: "All fields are required"});
        }

        const lastFood = await Food.findOne().sort({id:-1});
        const nextId = lastFood && lastFood.id? lastFood.id + 1 : 1;

        const newFood = await Food.create({
            id: nextId,
            name,
            price,
            image,
            description
        })

        res.status(201).json(newFood)

    } catch (error) {
        console.error("Create Food Error", error);
        res.status(500).json({message: "Something went wrong while adding new food items"});
    }
});

// Delete a food item [only an admin should be allowed to delete a food item]
router.delete("/:foodId", auth, adminAuth, async(req, res) => {
    try {
        const { foodId } = req.params;
        
        let deletedFood;
        // Check if foodId is a valid MongoDB ObjectId
        if (foodId.match(/^[0-9a-fA-F]{24}$/)) {
            deletedFood = await Food.findByIdAndDelete(foodId);
        } else {
            // Try deleting by custom numeric id
            deletedFood = await Food.findOneAndDelete({ id: Number(foodId) });
        }

        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({ message: "Food item deleted successfully", food: deletedFood });
    } catch (error) {
        console.error("Delete Food Error", error);
        res.status(500).json({ message: "Something went wrong while deleting the food item" });
    }
});

export default router