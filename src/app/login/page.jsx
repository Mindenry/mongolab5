"use client";
import React, { useState, useEffect } from "react"; // เพิ่ม useEffect
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession(); // เพิ่ม status เพื่อตรวจสอบสถานะการโหลด session

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("welcome");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // หรือ UI loading อื่นๆ
  }

  if (session) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }
      router.replace("welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-grow">
        <div className="flex justify-center items-center">
          <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
            <h3>Login Page</h3>
            <hr className="my-3" />
            <form onSubmit={handleSubmit}>
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
              <button className="block bg-green-500 p-2 my-2 rounded text-lg my-2">
                Sign In
              </button>
            </form>
            <hr className="my-3" />
            <p>
              ยังไม่มีบัญชี?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
