import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// App.use Stuff
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
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
app.post("/addEmployee", async (req, res) => {});

app.post("/addProduct", async (req, res) => {});

app.listen("1337", () => console.log("listening on port 1337"));
