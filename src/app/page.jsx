"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import create from "./create/page.jsx";

export default function Home() {
  const [postData, setPostData] = useState([]);
  return (
    <main className="container mx-auto">
      <h1>โปรเเกรม Next.js and mongo</h1>
      <hr className="my-3" />
      <button className=" border-1 rounded bg-green-600 text-white">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        <div className=" shadow-xl my-10 p-10 rounded-xl ">
          <h4 className="text-2xl ">Title</h4>
          <img src="img.jpg" alt="" />

          <p>เรามาเขียนโปรเเกรมกันเหอะ</p>
          <div className="mt-5">
            <Link
              href="/edit"
              className="border-1 py-2 px-3 rounded bg-gray-800 text-white "
            >
              Edit
            </Link>
            <Link
              href="/delete"
              className="border-1 py-2 px-3 rounded bg-red-800 text-white"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
