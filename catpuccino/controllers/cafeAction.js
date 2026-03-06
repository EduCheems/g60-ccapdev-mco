'use server'
import { connectDB } from "@/lib/mongodb"; 
import CatCafe from '@/models/CatCafe'

export async function getCountAllCafe(){
    try{
        await connectDB();
        const count = await CatCafe.countDocuments({});
        return count;
    }catch(error){
        console.error('Error fetching user profile:', error);
        throw error;
    }
}