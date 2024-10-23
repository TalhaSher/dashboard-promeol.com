import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  xProfile: {
    type: String,
    required: false,
  },
  pictureURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
