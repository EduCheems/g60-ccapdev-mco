import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { email, rememberMe } = await req.json();
        const user = await User.findOneAndUpdate(
            { email },
            { rememberMe },
            { new: true }
        );
        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ error: "Failed to update remember me preference" }, { status: 500 });
    }
}