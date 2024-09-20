import React, { useState } from "react";
import fetcher from "../api/fetcher";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const respone = await fetcher.post("/api/users/admin", {
        email,
        password,
      });
      console.log(respone);
      setToken(respone.data.token);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md max-w-md py-6 rounded-lg px-8">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3 min-w-72 ">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Email Addess
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-72 ">
            <p className="text-sm font-medium mb-2 text-gray-700">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="your@email.com"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md bg-black text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
