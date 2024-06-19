

const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kramu22004:ramu%40KUMAR123@gofood.p3sgl2w.mongodb.net/gofood?retryWrites=true&w=majority&appName=gofood";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
    const fetched_data = mongoose.connection.db.collection("food_items");

    const data = await fetched_data.find({}).toArray();
    const fetched_foodCategory = mongoose.connection.db.collection("foodCategory");

    const foodCategory = await fetched_foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory=foodCategory;
    console.log(data);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
