import { NextRequest, NextResponse } from "next/server";
import { getUserProfile } from "@/controllers/userAction";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb"; 
import User from "@/models/User"; 


export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    const userId = targetUserId || (session.user.id as string);
    const userProfile = await getUserProfile(userId);

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function POST(req:NextRequest){
  try{
    await connectDB();
     const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const info=await req.json();
    const {name,bio,profilePic,favCafe}=info;
    
    const changedUser=await User.findOneAndUpdate({email:session.user.email},
      {
        name:name,
        bio:bio,
        profilePicURL:profilePic,
        favCafe:favCafe
      },{  returnDocument: "after"  }  
    ).lean();
    if(!changedUser){
      return NextResponse.json({error:"User Not Found"},{status:404});
    }else{
     return NextResponse.json({ message: "Successfully Updated", user: changedUser });
    }
  }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
  }   
  
}