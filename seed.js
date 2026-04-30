import mongoose from "mongoose";
import Food from "./models/Food.js";
import dotenv from "dotenv"

dotenv.config();

export const foodData = [
  {
    id: 1,
    name: "Jalapeño Burger",
    price: 64.5,
    image:
      "https://images.deliveryhero.io/image/talabat/MenuItems/JALEPENO_BURGER_637235343750091320.jpg",
    description:
      "Fried jalapeño and spicy mayo on our 8 oz. 225gm angus beef with lettuce, tomato and onion. Served on a toasted bun with seasoned steak fries and pickle spear.",
  },
  {
    id: 2,
    name: "Fried chicken strips",
    price: 25.0,
    image:
      "https://assets.epicurious.com/photos/57a8a45db10b4fb03f234f34/16:9/w_1280,c_limit/southern-fried-chicken.jpg",
    description: "The best fried chicken on town you wont regret it ",
  },
  {
    id: 3,
    name: "Diminight shrimp",
    price: 40.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-WitOPDr__uVUWPzl9A5sf8UN4Yhq6hZEA&s",
    description: "Often imitated, never duplicated. Enough said.",
  },
  {
    id: 4,
    name: "Meat shawarma",
    price: 30.0,

    image:
      "https://amiraspantry.com/wp-content/uploads/2020/11/beef-shawarma-recipe-IG.jpg",
    description: "Our Shawrama with the best beef in the world ",
  },
  {
    id: 5,
    name: "Chicken shawarma",
    price: 25.0,

    image:
      "https://foxeslovelemons.com/wp-content/uploads/2023/06/Chicken-Shawarma-8.jpg",
    description: "Our Shawrama with the bestChick in the world ",
  },
  {
    id: 6,
    name: "Chicken beryani",
    price: 40.0,

    image: "https://easyindiancookbook.com/wp-content/uploads/2023/06/chicken-biryani.jpg",
    description:
      "A rich and aromatic basmati rice dish layered with tender, perfectly spiced chicken and slow-cooked with traditional herbs and fragrant spices. Every bite is full of deep flavor and comforting warmth, making it a true favorite for biryani lovers.",
  },
  {
    id: 7,
    name: "Pepperoni pizza",
    price: 50.0,
    image:
      "https://atsloanestable.com/wp-content/uploads/2023/06/new-york-style-pizza2.jpg",
    description:
      "The pizza comes with our finest pepperoni,cheese and tomato sause on coal",
  },
  {
    id: 8,
    name: "Margherita pizza",
    price: 40.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2LSIII0l5cnGOlRXJDvYUv9b5xOtWcP7KXcLj7KQR-OtDjysyVax4XlZfqN2LK4Q6Ok4X16EXiTjZ2yHCe4WaJDc-pXUihzXKdonObvy7g&s=10",
    description:
      "the pizza comes with tomamto suase and cheese served with a sode of gralic sause",
  },
  {
    id: 9,
    name: "Tom yum soup",
    price: 40.0,
    image:
      "https://hot-thai-kitchen.com/wp-content/uploads/2013/03/tom-yum-goong-blog.jpg",
    description:
      "A bold and aromatic Thai soup made with fresh herbs, lemongrass, lime, and chili, simmered with tender shrimp and mushrooms. Its perfect balance of spicy, sour, and savory flavors creates a refreshing and unforgettable taste in every spoonful.",
  },
  {
    id: 10,
    name: "Chocolate brownie",
    price: 35.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFezt_UZPzWl6O5jDat3xWh57SPzV80y3DwQ&s",
    description:
      "A rich and indulgent chocolate brownie baked to perfection with a soft, fudgy center and a slightly crisp top. Deep chocolate flavor in every bite makes it the perfect sweet treat to finish your meal. 🍫",
  },
];

const seedDB = async() => {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDB");

        await Food.deleteMany({});
        console.log("Existing food data cleared");
        

        await Food.insertMany(foodData);
        console.log("Food data successfully seeded");

        process.exit(0);
        
    } catch (error) {
        console.error("Error seeding the database", error);
        process.exit(1);
        
    }
}

seedDB();