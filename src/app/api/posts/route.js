import connectMongoDB from "../../../../lib/mongodb";
import Product from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, img, content, price } = await req.json();
  console.log(title, img, content, price);
  await connectMongoDB();
  await Product.create({
    title,
    img,
    content,
    price,
  });
  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
