"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

function EditProductPage() {
  const params = useParams();
  const { id } = params;

  const [productData, setProductData] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const router = useRouter();

  const getProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch a product");
      }

      const data = await res.json();
      console.log("Edit product: ", data);
      setProductData(data.product);

      setNewTitle(data.product.title);
      setNewImg(data.product.img);
      setNewContent(data.product.content);
      setNewPrice(data.product.price || "");
    } catch (error) {
      console.error("Error loading products : ", error);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newImg,
          newContent,
          newPrice: parseFloat(newPrice),
        }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">แก้ไขข้อมูลสินค้า</h3>
      <hr className="my-3" />
      <Link
        href="/product"
        className="bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2 inline-block"
      >
        กลับหน้าหลัก
      </Link>
      {productData && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">ชื่อสินค้า</label>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
              placeholder="ชื่อสินค้า"
              value={newTitle}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">URL รูปภาพ</label>
            <input
              onChange={(e) => setNewImg(e.target.value)}
              type="text"
              className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
              placeholder="URL รูปภาพ"
              value={newImg}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">รายละเอียดสินค้า</label>
            <textarea
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg h-32"
              placeholder="รายละเอียดสินค้า"
              value={newContent}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">ราคา (บาท)</label>
            <input
              onChange={(e) => setNewPrice(e.target.value)}
              type="number"
              className="w-full md:w-[500px] block bg-gray-100 border py-2 px-3 rounded text-lg"
              placeholder="ราคา"
              value={newPrice}
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
      )}
    </div>
  );
}

export default EditProductPage;
