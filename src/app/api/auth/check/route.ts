import { connectMongoDB } from "@/lib/mongodb";
import { messages } from "@/utils/messages";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    //Obtain and validate the token
    const headerList = await headers();
    const token = headerList.get("token");
    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
      //@ts-ignore
      const { data } = isTokenValid;

      //Verify if the user exists or not in the database
      await connectMongoDB();
      const userFound = await User.findById(data._id);
      if (!userFound) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { isAuthorized: true, message: messages.success.authorized },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 400 }
    );
  }
}
