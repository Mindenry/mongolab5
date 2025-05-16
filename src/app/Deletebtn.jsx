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
            text: "ข้อมูลของคุณถูกลบเรียบร้อยแล้ว",
            icon: "success",
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่สามารถลบข้อมูลได้",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <a
      onClick={handleDelete}
      className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
    >
      Delete
    </a>
  );
}

export default Deletebtn;
