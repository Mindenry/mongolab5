import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDB();
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
