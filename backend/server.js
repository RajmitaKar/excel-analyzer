import express from "express"; // Or use import if you're working with ES modules
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import EmployeeModel from "./models/Employee.js";
import bcrypt from "bcryptjs";

const app = express();
dotenv.config(); // ✅ Load .env early
connectDB();

app.use(cors({ origin: /^http:\/\/localhost:\d+$/, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to zidio project!");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.json({ message: "No record existed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "The password is incorrect" });
    }

    res.json({ message: "Success"});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});


app.listen(5002, () => {
  console.log("🔥 SERVER STARTED ON PORT:5002");
});

