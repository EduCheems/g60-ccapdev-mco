'use server'
import { connectDB } from "@/lib/mongodb"; 
import User from '@/models/User'


export async function getUserProfile(userId){
    try{
        await connectDB();
        console.log(userId);
        const user = await User.findById(userId).select('-password').lean();
        if(!user){
            throw new Error('User not found');
        }else{
            console.log(user);
            return user;
        }
    }catch(error){
        console.error('Error fetching user profile:', error);
        throw error;
    }
}