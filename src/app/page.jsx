"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Deletebtn from "./Deletebtn";

export default function Home() {
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
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">JIB Eieina</h1>
      <hr className="my-3" />
      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        <Link href="/create">เพิ่มสินค้าใหม่</Link>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6">
        {productData && productData.length > 0 ? (
          productData.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={product.img}
                  width={400}
                  height={300}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.content}
                </p>
                {product.price ? (
                  <div className="mb-3">
                    <p className="text-gray-500 line-through">
                      ฿{product.price.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      ฿{calculatePromoPrice(product.price).toLocaleString()}{" "}
                      <span className="text-sm font-normal">โปรโมชั่น 50%</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-red-600 mb-3">
                    ไม่ระบุราคา
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/edit/${product._id}`}
                    className="bg-gray-800 text-white py-2 px-3 rounded-md hover:bg-gray-900 transition"
                  >
                    แก้ไข
                  </Link>
                  <Deletebtn id={product._id} />
                  <button
                    onClick={() => handleBuy(product._id)}
                    className="bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition"
                  >
                    หยิบใส่ตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 bg-gray-100 p-4 rounded-md">
            ยังไม่มีสินค้าในระบบ
          </p>
        )}
      </div>
    </main>
  );
}
