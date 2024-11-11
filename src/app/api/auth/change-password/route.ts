import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface BodyProps {
  newPassword: string;
  confirmNewPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BodyProps = await request.json();

    const { newPassword, confirmNewPassword } = body;

    //Validating that all fields are completed
    if (!newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 404 }
      );
    }

    //Conection to database
    await connectMongoDB();

    const headerList = await headers();
    const token = headerList.get("token");

    //Verify if token exist
    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 404 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");

      //@ts-ignore
      const { data } = isTokenValid;
      const userFound = await User.findById(data.userId);
      if (!userFound) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 404 }
        );
      }

      //Verify if newPassword is or not equal to confirmNewPassword
      if (newPassword !== confirmNewPassword) {
        return NextResponse.json(
          { message: messages.error.passwordsNotMatch },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userFound.password = hashedPassword;
      await userFound.save();

      return NextResponse.json(
        { message: messages.success.passwordChanged },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid, error },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 400 }
    );
  }
}
