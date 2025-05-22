"use client";

import React from "react";
import Link from "next/link";
import NextLogo from "../../../public/next.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  // สมมติว่า session มี role อยู่ด้วย
  const userRole = session?.user?.role || "user"; // ถ้าไม่มี role ให้เป็น user เป็นค่าเริ่มต้น

  return (
    <nav className="flex justify-between items-center shadow-md p-5">
      <div>
        <Link href="/">
          <Image src={NextLogo} width={100} height={100} alt="next logo" />
        </Link>
      </div>
      <ul className="flex space-x-4">
        {!session ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            {/* แสดงสถานะ Role ปัจจุบัน */}
            <li>
              {userRole === "user" && (
                <span className="bg-blue-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-default">
                  User Role
                </span>
              )}
              {userRole === "admin" && (
                <span className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-default">
                  Admin Role
                </span>
              )}
            </li>
            <li>
              <Link
                href="/product"
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
              >
                Product
              </Link>
            </li>
            <li>
              <a
                onClick={() => signOut()}
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
              >
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
