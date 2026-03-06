import { NextRequest,NextResponse } from "next/server";
import { getUserProfile } from "@/controllers/profileAction";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req:NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const JWTSKEY = process.env.JWT_SECRETKEY;
        if (!JWTSKEY) {
            throw new Error("JWT_SECRETKEY is not defined in environment variables");
        }
        const decoded: any = jwt.verify(token, JWTSKEY);
        const userProfile = await getUserProfile(decoded.userId);
        return NextResponse.json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
    }
}