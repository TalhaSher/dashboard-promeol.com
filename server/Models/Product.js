import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  techInfo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
