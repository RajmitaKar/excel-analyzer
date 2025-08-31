import { useState } from 'react';
import { loginUser } from '../api/auth';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate = useNavigate();
  const handleSubmit =async(e) => {
  e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await loginUser({ email, password });
      const {message}= res.data;

      if (message ==="Success") {
        alert("Login successful!");
        navigate("/dashboard"); // Change to your actual route 
      } else {
        alert("Error")
        toast.error(message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
    console.log("login:", {email, password });
    };
  return (
    <div className="min-h-screen bg-[url('/graphdesign.jpg')] bg-contain bg-center flex items-center justify-center">
      <div className="bg-white/60 rounded-xl shadow-xl w-full max-w-sm py-9 min-h-[400px]">
        <h1 className="text-black text-3xl font-bold mb-6 text-center mt-3">Login</h1>
        <form  onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2 ml-4 -mt-6">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-white w-[90%] mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black mb-2 ml-4 -mt-3">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-white w-[90%] mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-[90%] mx-auto block bg-sky-100 text-blue-500 to white border-1 border-blue font-bold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
          <p className="mt-3 text-center text-gray-700">
            Don’t have an account?{' '}
            <Link to="/register" className="underline hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;