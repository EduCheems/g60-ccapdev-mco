'use server'
import { connectDB } from "@/lib/mongodb"; 
import Post from '@/models/Post'


export async function getCountAllPost(){
    try{
        await connectDB();
        const count = await Post.countDocuments({});
        return count;
    }catch(error){
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export async function getCafePost(cafeId){
    try{
        await connectDB();
        const post_Cafe = await Post.find({cafeID:cafeId}).sort({created:-1}).lean();
        return post_Cafe.map(p=>({...p,_id:p._id.toString()}));
    }catch(error){
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export async function getUserPost(userId){
    try{
        await connectDB();
        const post_User = await Post.find({userID:userId}).sort({created:-1}).lean();
        return post_User.map(p=>({...p,_id:p._id.toString()}));
    }catch(error){
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

