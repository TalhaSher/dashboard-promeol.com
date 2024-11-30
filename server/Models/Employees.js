import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
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
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  x: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
