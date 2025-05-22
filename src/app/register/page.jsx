"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    if (!name || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await resCheckUser.json();
      if (data.user) {
        setError("User already exists");
        setSuccess("");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        setError(""); // เพิ่มบรรทัดนี้
        setSuccess("Registration successful!");
        form.reset();
      } else {
        setError("Registration failed"); // เพิ่มบรรทัดนี้
        setSuccess(""); // เพิ่มบรรทัดนี้
        console.log("Registration failed");
      }
    } catch (error) {
      setError("Error during registration"); // เพิ่มบรรทัดนี้
      setSuccess(""); // เพิ่มบรรทัดนี้
      console.log("Error during registration:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-grow">
        <div className="flex justify-center items-center">
          <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
            <h3>Register!!</h3>
            <hr className="my-3" />
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                  {success}
                </div>
              )}
              <input
                onChange={(e) => setName(e.target.value)}
                className="block bg-gray-300 p-2 my-2 rounded-md"
                type="text"
                placeholder="Enter your name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="block bg-gray-300 p-2 my-2 rounded-md"
                type="text"
                placeholder="Enter your email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="block bg-gray-300 p-2 my-2 rounded-md"
                type="password"
                placeholder="Enter your password"
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block bg-gray-300 p-2 my-2 rounded-md"
                type="password"
                placeholder="Confirm your password"
              />
              <button className="block bg-green-500 p-2 my-2 rounded text-lg my-2">
                Submit
              </button>
            </form>
            <hr className="my-3" />
            <p>
              Go to{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
