import NextAuth, { CredentialsSignin } from "next-auth" 
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials" 
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise, { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose';

 connectDB();
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

            return { id: user._id.toString(), email: user.email, name: user.username };
        },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, 

 callbacks: {
  async session({ session }) {
    const fullUser = await User.findOne({ email: session.user.email }).lean();
    if (!fullUser) return session;

    session.user.id = fullUser._id.toString();
    session.user.role = fullUser.role;
    session.user.profile = fullUser.profile;
    session.user.favoriteCatCafeID = fullUser.favoriteCatCafeID;
    session.user.isDeactivated = fullUser.isDeactivated;

    return session;
  },
},

events: {
  async createUser({ user}) {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      await User.updateOne({email:user.email},{
        _id:user.id,
        name:user.name,
        email: user.email,
        password: null,
        oauthProvider: account?.provider || "google",
        role: ["user"],
        profile: {
          firstName: "",
          lastName: "",
          profilePicURL: null,
          coverPicURL: null,
          bio: "",
          shortDescription: "",
        },
        isDeactivated:false,
        rememberToken:account.access_token,
        tokenExpiration: new Date(account.expires_at*1000),
        favoriteCatCafeID: null,
      });
    }
  },
},
})