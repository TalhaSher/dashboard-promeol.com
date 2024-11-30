import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Employee from "./Models/Employees.js";
import Product from "./Models/Product.js";

dotenv.config();

// App.use Stuff
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3039",
  })
);

// Mongo db connection
mongoose.connect(process.env.MONGOOSE_CLIENT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// routes
app.post("/addEmployee", async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const employee = new Employee(data);
    await employee.save();
    res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/updateEmployee", async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    const employee = await Employee.findOne({ id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      updatedData,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/getEmployees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/deleteEmployee", async (req, res) => {
  try {
    const { id } = req.body; // Extract the custom ID from the request body

    // Find the employee document using the custom ID
    const employee = await Employee.findOne({ id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the employee document using the _id
    await Employee.findByIdAndDelete(employee._id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Products

app.post("/addProduct", async (req, res) => {
  try {
    const data = req.body;
    const product = new Product(data);
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Failed to add product. Please try again." });
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Failed to add product. Please try again." });
  }
});
app.listen("1337", () => console.log("listening on port 1337"));
