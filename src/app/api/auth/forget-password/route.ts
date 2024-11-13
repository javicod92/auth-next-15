import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    //Variable to storage the email sent in the request body
    const body: { email: string } = await request.json();
    const { email } = body;

    //Connection to the database and validation of the user's
    //existence in the database
    await connectMongoDB();
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 404 }
      );
    }

    const tokenData = {
      email: userFound.email,
      userId: userFound._id,
    };

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: 86400,
    });

    const forgetUrl = `http://localhost:3000/change-password?token=${token}`;

    //@ts-ignore
    resend.emails.send({
      from: "onboarding@resend.dev",
      // to: [email],
      to: "pproveemail@gmail.com",
      subject: "Cambio de contraseña",
      react: EmailTemplate({ buttonUrl: forgetUrl }),
    });

    return NextResponse.json(
      { message: messages.success.emailSent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}
