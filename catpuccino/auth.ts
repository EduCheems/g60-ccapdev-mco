import NextAuth, { CredentialsSignin } from "next-auth" 
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials" 
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise, { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

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
  
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    Credentials({
        name: "credentials", 
        credentials: {
            email: {}, password: {} , rememberMe:{}
        },
        async authorize(credentials) {
            await connectDB();
            
            const user = await User.findOne({ email: credentials?.email }); 
            
            if (!user) throw new Error("UserNotFound"); 
            if (!user.password) throw new Error("GoogleAccount"); 

            const isValid = await bcrypt.compare(credentials!.password as string, user.password);
            if (!isValid) throw new Error("InvalidPassword"); 
            const userObj = user.toObject();

            return { 
                id: userObj._id.toString(),
                name: userObj.username,
                email: userObj.email,
                role: userObj.role ?? "user",
                bio: userObj.bio ?? "",
                profilePicURL: userObj.profilePicURL ?? null,
                favoriteCatCafeID: userObj.favoriteCatCafeID ?? null,
                followersCount: userObj.followersCount ?? 0,
                followingCount: userObj.followingCount ?? 0,
                postCount: userObj.postCount ?? 0,
                isDeactivated: userObj.isDeactivated ?? false, 
                image: userObj.image ?? null,
                favCafe: userObj.favCafe ?? [],
                rememberMe: credentials?.rememberMe === "true",
            };
        },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET, 

  callbacks: {

    async jwt({ token, user, trigger, session,account }) {
      if (user) {
        if(!user.rememberMe) {
          await connectDB();
          const currentUser=await User.findOne({email:user.email});
          if(currentUser){
            const userObj=currentUser.toObject();
            token.id = userObj._id.toString();
            token.role = userObj.role?? "user";
            token.favCafe = userObj.favCafe?? [];
            token.username = userObj.username;
            token.rememberMe = userObj.rememberMe??false;
          }
        }else{
          token.id = user.id;
          token.role = user.role;
          token.favCafe = user.favCafe;
          token.username = user.name;
          token.rememberMe = user.rememberMe;
         
        }
        if (account?.provider === "google") {
          token.rememberMe = true;
        }
        if (token.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 21 * 24 * 60 * 60;
           await User.updateOne(
            { email: user?.email },
            { $set: { rememberMe: true } }
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.favCafe = token.favCafe as any;
        session.user.name = token.username as string;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      await connectDB();
      
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        const pass = (user.name?.slice(0, 4) ?? "user") + "1234";
        const hashedPass = await bcrypt.hash(pass, 10); 
        await User.updateOne({ email: user.email }, {
          password: hashedPass,
          role: "user",
          profilePicURL: "",
          bio: "",
          followersCount: 0,
          followingCount: 0,
          postCount: 0,
          isDeactivated: false,
          image: user.image,
          favCafe: [],
          rememberMe: false,
        });
      }
    },
  },
})