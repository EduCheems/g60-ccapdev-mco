import { connectDB } from "@/lib/mongodb";
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const cafes = await CatCafe.find({}, "name"); 
        
        const cafeNames = cafes
        .map(c => c.name)
        .filter(name => name != null);
        return NextResponse.json(cafeNames);
    } catch (error) {
        console.error("ACTUAL POST ERROR:", error);
        
    }
}