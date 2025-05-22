import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            มาสร้างระบบ Register กัน
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            ระบบลงทะเบียนที่ใช้งานง่าย ปลอดภัย และน่าเชื่อถือ
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              เริ่มต้นใช้งาน
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-lg border border-gray-300 transition duration-300">
              เรียนรู้เพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
