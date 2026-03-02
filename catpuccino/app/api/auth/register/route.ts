import { connectDB } from "@/lib/mongodb"; 
import User from "@/models/User"; 
import { NextResponse } from "next/server"; 
import bcrypt from "bcryptjs"; 

export async function POST(req: Request){
    try {
        const { username, email, password} = await req.json(); 

        await connectDB(); 

        // For checking if user exists 
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser){
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // For hashing 
        const hashedPass = await bcrypt.hash(password, 10); 

        // Create user if new 
        const newUser = await User.create({
            username, 
            email, 
            password: hashedPass,
        }); 

        return NextResponse.json({ message: "User created!", userId: newUser._id }, { status: 201 }); 
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}