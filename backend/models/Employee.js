import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Hash password before saving
EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
export default EmployeeModel;