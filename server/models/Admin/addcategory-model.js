const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CategorySchema = new mongoose.Schema({
  categoryNumber: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

// define the model or the collection name.
const Category = new mongoose.model("Category", CategorySchema);
module.exports = Category;
