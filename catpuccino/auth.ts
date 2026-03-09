import NextAuth, { CredentialsSignin } from "next-auth" 
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials" 
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise, { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose';
import { MongoClient } from "mongodb"

await connectDB();
class GoogleAccountError extends CredentialsSignin {
  code = "GoogleAccount"
}
class UserNotFoundError extends CredentialsSignin {
  code = "UserNotFound"
}
class InvalidPasswordError extends CredentialsSignin {
  code = "InvalidPassword"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
 adapter: MongoDBAdapter(clientPromise),
  
  providers: [

    Google({
        
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    Credentials({
        name: "credentials", 
        credentials: {
            email: {}, password: {} 
        },
        async authorize(credentials) {
            
            const user = await User.findOne({ email: credentials?.email }); 
            
            // Just throw standard Errors with your exact code word
            if (!user) throw new Error("UserNotFound"); 
          
            if (!user.password) throw new Error("GoogleAccount"); 

            const isValid = await bcrypt.compare(credentials!.password as string, user.password);
            if (!isValid) throw new Error("InvalidPassword"); 

            return { id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    role: user.role ?? "user",
                    bio: user.bio ?? "",
                    profilePicURL: user.profilePicURL ?? null,
                    favoriteCatCafeID: user.favoriteCatCafeID ?? null,
                    followersCount: user.followersCount ?? 0,
                    followingCount: user.followingCount ?? 0,
                    postCount: user.postCount ?? 0,
                    isDeactivated: user.isDeactivated ?? false, 
                    image:user.image??null
                  };
        },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, 

 callbacks: {
  async session({ session }) {
    const UserHolder = await User.findOne({ email: session.user.email }).lean();
    if (!UserHolder) return session;

    session.user.id = UserHolder._id.toString();
    session.user.name=UserHolder.name;
    session.user.role = UserHolder.role;
    session.user.bio=UserHolder.bio;
    session.user.profilePicURL=UserHolder.profilePicURL;
    session.user.isDeactivated = UserHolder.isDeactivated;
    session.user.followersCount=UserHolder.followersCount;
    session.user.followingCount=UserHolder.followingCount;
    session.user.postCount=UserHolder.postCount;
    session.user.image=UserHolder.image;
    return session;
  },
},

events: {
  async createUser({ user}) {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      const pass = (user.name?.slice(0, 4) ?? "user") + "1234";
      const hashedPass = await bcrypt.hash(pass, 10); 
      await User.updateOne({email:user.email},{
        password:  hashedPass,
        role: "user",
        profilePicURL: "/default-avatar.png",
        bio: "",
        followersCount:user.followersCount,
        followingCount:user.followingCount,
        postCount:user.postCount,
        isDeactivated:false,
        image:user.image,
      });
    }
  },
},
})