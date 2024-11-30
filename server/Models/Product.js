import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
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
  technicalInfo: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
