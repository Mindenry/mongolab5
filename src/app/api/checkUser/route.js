import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("User: ", user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while registering the user.",
      },
      { status: 500 }
    );
  }
}
