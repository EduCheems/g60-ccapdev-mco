import { connectDB } from "@/lib/mongodb"; 
import CatCafe from "@/models/CatCafe";
import { NextRequest,NextResponse } from "next/server";    
import jwt from "jsonwebtoken";

//handles the POST request to register a new cafe
export async function POST(req: NextRequest){
    try {
        // Extract token from Authorization header
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        //JWT_SECRETKEY is used to verify the token and extract the user ID of the cafe owner
        const JWTSKEY = process.env.JWT_SECRETKEY;
        /*Neccessary check to ensure that the JWT_SECRETKEY is defined in the environment variables
        before attempting to verify the token*/
        if (!JWTSKEY) {
            throw new Error("JWT_SECRETKEY is not defined in environment variables");
        }

        /*The token is verified using the JWT_SECRETKEY, and if the token is valid, the user ID of the cafe owner 
        is extracted from the token's payload and stored in holder variable*/
        const holder: any = jwt.verify(token, JWTSKEY);
        //extracts the necessary data from the request body and connects to the database
        const{ name, description, menu, cats} = await req.json();
        await connectDB();

        //checks if a cafe with the same name already exists in the database
        const existingCafe = await CatCafe.findOne({name});
        if(existingCafe){
            return NextResponse.json({ message: "Cafe already exists" }, { status: 409 });
        }
        //Checks if the cafe owner id exists in the database and creates a new cafe if it does
        const ownerID = holder.userId;
        //creates a new cafe in the database with the provided information and returns a success response
        const newCafe = await CatCafe.create({
            ownerID,
            name,
            description,
            menu,
            cats,
        });
        return NextResponse.json({ message: "Cafe registered successfully", cafe: newCafe }, { status: 201 });
    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

