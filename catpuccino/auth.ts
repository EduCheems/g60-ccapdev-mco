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

            return { 
                id: user._id.toString(),
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
                image: user.image ?? null,
                favCafe: user.favCafe ?? [],
                rememberMe: user.rememberMe ?? false,
            };
        },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 21 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET, 

  callbacks: {

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.favCafe = (user as any).favCafe;
        token.username = (user as any).name;
      if (user) {
      token.rememberMe = user.rememberMe;
      }
      if(user.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 3 * 7 * 24 * 60 * 60;
      } else {
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; 
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
        });
      }
    },
  },
})