import { connectDB } from "@/lib/mongodb"; 
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 
import User from "@/models/User";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest){
    try {
        
        // Extract username and password from the request body
        const { username, password } = await req.json();
        await connectDB();
       
        console.log(username);
        // Find the user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ message: "Invalid username" }, { status: 401 });
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            console.log("Invalid password");
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
       
        // If the username and password are valid, generate a JWT token for the user
        const JWTSKEY = process.env.JWT_SECRETKEY;
        if (!JWTSKEY) {
            throw new Error("JWT_SECRETKEY is not defined in environment variables");
        }
        // The token includes the user's ID and is set to expire in 24 hours
        const token = jwt.sign({ userId: user._id }, JWTSKEY, { expiresIn: "24h" });
        // Return a success response with the user's information and the generated token
        
        return NextResponse.json({ message: "Login successful", user: { id: user._id, username: user.username }, token }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }   
}    