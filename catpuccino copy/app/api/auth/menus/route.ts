import { connectDB } from "@/lib/mongodb";
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const url=new URL(req.url);
        const cafeName=url.searchParams.get("cafe")
        await connectDB();
       const cafe = await CatCafe.findOne({ name: cafeName }, "menu").lean();
        const allMenu = cafe?.menu ? Object.values(cafe.menu as Record<string, any>) : [];
        return NextResponse.json(allMenu);
    } catch (error) {
        console.error("ACTUAL POST ERROR:", error);
        
    }
}