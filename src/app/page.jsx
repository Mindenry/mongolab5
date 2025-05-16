"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Deletebtn from "./Deletebtn";

export default function Home() {
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.error("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto">
      <h1>โปรเเกรม Next.js and mongo</h1>
      <hr className="my-3" />
      <button className="border-4 rounded bg-green-600 text-white">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h4 className="text-2xl">{val.title}</h4>
              <Image src={val.img} width={300} height={0} alt={val.title} />
              <p>{val.content}</p>
              <div className="mt-5">
                <Link
                  href={`/edit/${val._id}`}
                  className="border-1 py-2 px-3 rounded bg-gray-800 text-white"
                >
                  Edit
                </Link>
                <Deletebtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 mt-3">You do not have any posts yet.</p>
        )}
      </div>
    </main>
  );
}
