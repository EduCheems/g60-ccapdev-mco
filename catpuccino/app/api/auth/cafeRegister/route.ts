import { connectDB } from "@/lib/mongodb"; 
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server";         

//handles the POST request to register a new cafe
export async function POST(req: Request){
    try {
        // Extract token from Authorization header
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        //extracts the necessary data from the request body and connects to the database
        const{ownerID, name, description, menu, cats} = await req.json();
        await connectDB();
        //checks if a cafe with the same name already exists in the database
        const existingCafe = await CatCafe.findOne({name});
        if(existingCafe){
            return NextResponse.json({ message: "Cafe already exists" }, { status: 409 });
        }
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

