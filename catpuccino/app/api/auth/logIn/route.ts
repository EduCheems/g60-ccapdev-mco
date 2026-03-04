import { connectDB } from "@/lib/mongodb"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    try {
        const { username, password } = await req.json();
        await connectDB();
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: "Invalid username" }, { status: 401 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        const JWTSKEY = process.env.JWT_SECRETKEY;
        if (!JWTSKEY) {
            throw new Error("JWT_SECRETKEY is not defined in environment variables");
        }
        const token = jwt.sign({ userId: user._id }, JWTSKEY, { expiresIn: "24h" });
        return NextResponse.json({ message: "Login successful", user: { id: user._id, username: user.username }, token }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }   
}    