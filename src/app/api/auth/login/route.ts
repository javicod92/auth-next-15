import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    //Database connection
    await connectMongoDB();

    //Reception of body parameters
    const body: IUser = await request.json();
    const { email, password } = body;

    // Validation of requests
    if (!email || !password) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 404 }
      );
    }

    // Searching user in the database by email
    const userFound = await User.findOne({ email });

    // Verification of the found user by email
    if (!userFound) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 404 }
      );
    }

    //Verification if the password is correct
    const isCorrect: boolean = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!isCorrect) {
      return NextResponse.json(
        { message: messages.error.incorrectPassword },
        { status: 404 }
      );
    }

    const { password: userPass, ...rest } = userFound._doc;

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { userLogged: rest, message: messages.success.userLogged },
      { status: 200 }
    );

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}
