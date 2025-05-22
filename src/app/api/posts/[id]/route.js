import { connectToDB } from "../../../../../lib/mongodb";
import Product from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newImg: img,
    newContent: content,
    newPrice: price,
  } = await req.json();
  await connectToDB();
  await Product.findByIdAndUpdate(id, { title, img, content, price });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
