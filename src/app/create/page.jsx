"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          img,
          price: parseFloat(price),
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a product");
      }
    } catch (error) {
      console.log("Error creating product: ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">เพิ่มสินค้าใหม่</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2 inline-block"
      >
        กลับหน้าหลัก
      </Link>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">ชื่อสินค้า</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
            placeholder="ชื่อสินค้า"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">URL รูปภาพ</label>
          <input
            onChange={(e) => setImg(e.target.value)}
            value={img}
            type="text"
            className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
            placeholder="URL รูปภาพ"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">รายละเอียดสินค้า</label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg h-32"
            placeholder="รายละเอียดสินค้า"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">ราคา (บาท)</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
            placeholder="ราคา"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-4 rounded text-lg hover:bg-green-600 transition"
        >
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
}
