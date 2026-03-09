import { connectDB } from "@/lib/mongodb";
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const cafes = await CatCafe.find({}); 
        return NextResponse.json(cafes);
    } catch (error) {
       return NextResponse.json({ error: "Database error" }, { status: 500 });
        
    }
}