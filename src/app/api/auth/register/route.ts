import User, { IUser, IUserSchema } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
// import { isValidEmail } from "@/utils/isValidEmail";
import { connectMongoDB } from "@/lib/mongodb";
import { messages } from "@/utils/messages";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const userSchema = z
  .object({
    email: z.string().email(messages.error.emailNotValid),

    password: z
      .string()
      .min(8, messages.error.passwordTooShort)
      .regex(/[A-Z]/, messages.error.passwordNeedsUppercase)
      .regex(/[a-z]/, messages.error.passwordNeedsLowercase)
      .regex(/\d/, messages.error.passwordNeedsNumber)
      .regex(/[\W_]/, messages.error.passwordNeedsSpecialChar),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.error.passwordsNotMatch,
    path: ["confirmPassword"],
  });

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const { email, password } = userSchema.parse(body);

    //function to validate all fields
    // if (!email || !password || !confirmPassword) {
    //   return NextResponse.json(
    //     { message: messages.error.needProps },
    //     { status: 400 }
    //   );
    // }

    //function to validate the email entered by the user
    // if (!isValidEmail(email)) {
    //   return NextResponse.json(
    //     { message: messages.error.emailNotValid },
    //     { status: 400 }
    //   );
    // }

    //function to verify if password === confirmPassword
    // if (password !== confirmPassword) {
    //   return NextResponse.json(
    //     { message: messages.error.passwordsNotMatch },
    //     { status: 400 }
    //   );
    // }

    //Before to save a new user, we need to verify if the email entered exists or not in the database
    const userFind = await User.findOne({ email });
    if (userFind) {
      return NextResponse.json(
        { message: messages.error.emailExist },
        { status: 200 }
      );
    }

    //function to encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //function to generate a new user
    const newUser: IUserSchema = new User({
      email,
      password: hashedPassword,
    });

    //@ts-ignore
    const { password: userPass, ...rest } = newUser._doc;

    await newUser.save();

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { newUser: rest, message: messages.success.userCreated },
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}
