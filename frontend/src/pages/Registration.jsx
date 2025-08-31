import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Registration = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[number,setNumber]=useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
   e.preventDefault();
    // Handle form submission logic here
        try {
     const payload = { name, email, number, password };
    const res = await registerUser(payload);

    const { message } = res.data; // ✅ sirf message use karenge

    if (message === "Registration successful") {
      alert("Registration successful");
      toast.success("Registration successful!");
      navigate("/dashboard");
    } else {
      toast.error(message || "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong. Please try again.");
  }
  console.log("Register:", { name, email, password, number });
};

  return (
    <div className="flex items-center justify-center h-screen -mt-10 bg-[url('/graphdesign.jpg')] bg-cover bg-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Registration
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-black">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-white mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-white mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium text-black">
            Number
          </label>
          <input
            id="number"
            type="number"
            placeholder="Enter your number"
             value={number}
             onChange={(e) => setNumber(e.target.value)}
            className=" bg-white mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-black">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Set your Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            className=" bg-white mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-200 border-1 border-blue text-blue-500 py-2 rounded-md hover:bg-purple-700 hover:text-white transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;