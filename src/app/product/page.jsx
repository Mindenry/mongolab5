"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Deletebtn from "./Deletebtn";

export default function Product() {
  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setProductData(data.products);
    } catch (error) {
      console.error("Error loading products: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleBuy = (productId) => {
    alert(`สินค้ารหัส ${productId} ถูกเพิ่มลงในตะกร้าแล้ว`);
  };

  const calculatePromoPrice = (originalPrice) => {
    return Math.round(originalPrice * 0.5);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/welcome"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                JIB Eieina
              </h1>
              <p className="text-gray-600">ร้านค้าอุปกรณ์คอมพิวเตอร์ครบวงจร</p>
            </div>
          </div>
          <Link
            href="/create"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            เพิ่มสินค้าใหม่
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productData && productData.length > 0 ? (
            productData.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={product.img}
                    width={400}
                    height={300}
                    alt={product.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  {product.price && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -50%
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {product.content}
                  </p>
                  {product.price ? (
                    <div className="mb-4 space-y-1">
                      <p className="text-gray-400 line-through text-sm">
                        ฿{product.price.toLocaleString()}
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        ฿{calculatePromoPrice(product.price).toLocaleString()}{" "}
                        <span className="text-sm font-normal bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          โปรโมชั่น 50%
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-800 mb-4">
                      ไม่ระบุราคา
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/edit/${product._id}`}
                      className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 text-center text-sm"
                    >
                      แก้ไข
                    </Link>
                    <div className="flex-1">
                      <Deletebtn id={product._id} />
                    </div>
                    <button
                      onClick={() => handleBuy(product._id)}
                      className="w-full mt-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      หยิบใส่ตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4">
              <div className="bg-white p-8 rounded-xl text-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <p className="text-gray-600 text-lg">ยังไม่มีสินค้าในระบบ</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
