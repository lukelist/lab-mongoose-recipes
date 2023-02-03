const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Mac n' Cheese",
      level: "Easy Peasy",
      ingredients: ["elbow macaroni", "milk", "butter", "velveeta"],
      cuisine: "American",
      dishType: "other",
    });
  })
  .then((Recipe) => console.log(Recipe))
  .then(() => {
    Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .catch((error) => {
    console
      .error("Error connecting to the database", error)
      .finally(() => mongoose.connection.close());
  });
