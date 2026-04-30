import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image:{type: String, required: true},
    description:{type: String, required: true},
});

const Food = mongoose.model("Food", foodSchema);

export default Food;