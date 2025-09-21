// const mongoose = require("mongoose");
// require('dotenv').config();
// const mongoURI = process.env.MONGO_URI;

// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true });
//         console.log("Connected successfully");

//         const foodItemsCollection = mongoose.connection.db.collection("fooditems");
//         const data = await foodItemsCollection.find({}).toArray();
        
//         const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
//         const catData = await foodCategoryCollection.find({}).toArray();
        
//         console.log("Fetched data:", data);
//         console.log("Fetched categories:", catData);

//         // Store fetched data in global variables
//         global.fooditems = data;
//         global.foodCategory = catData;
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         // Handle error gracefully here
//     }
// };

// module.exports = connectToMongoDB;

const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectToMongoDB = async () => {
    try {
        // ⬇️ CHANGED: removed `{ useNewUrlParser: true }` (deprecated in Mongoose v6+)
        await mongoose.connect(mongoURI /* , { useNewUrlParser: true } */);
        console.log("✅ Connected successfully");

        const foodItemsCollection = mongoose.connection.db.collection("fooditems");
        const data = await foodItemsCollection.find({}).toArray();
        
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategoryCollection.find({}).toArray();
        
        // ⬇️ CHANGED: improved logging (instead of dumping full arrays)
        console.log("Fetched data:", data.length, "items"); 
        console.log("Fetched categories:", catData.length, "categories");

        // Store fetched data in global variables
        global.fooditems = data;
        global.foodCategory = catData;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        // Handle error gracefully here
    }
};

module.exports = connectToMongoDB;
