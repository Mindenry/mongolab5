"use client";
import React from "react";
import Swal from "sweetalert2";

function Deletebtn({ id }) {
  const handleDelete = async () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถย้อนกลับการกระทำนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            title: "ลบแล้ว!",
            text: "สินค้าถูกลบออกจากระบบเรียบร้อยแล้ว",
            icon: "success",
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่สามารถลบสินค้าได้",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition"
    >
      ลบ
    </button>
  );
}

export default Deletebtn;
