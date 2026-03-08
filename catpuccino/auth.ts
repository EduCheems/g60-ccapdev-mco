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
            await connectDB(); 
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
})