import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { connectMongoDB } from "@/lib/mongodb";
import { headers } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";

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
    } catch (error) {}
  } catch (error) {}
}
