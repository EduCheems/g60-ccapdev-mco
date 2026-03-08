import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: mongoose.Types.ObjectId;
      name?: string;
      email?: string | null;
      role?: string;
      bio?: string|null;
      image?:string|null;
      profilePicURL?: string | null;
      followersCount?:number|null;
      followingCount?:number|null;
      postCount?:number|null;
      isDeactivated?: boolean;
    };
  }

  interface User {
    id: string;
    role?: string;
    bio?: string|null;
    profilePicURL?: string | null;
    followersCount?:number|null;
    followingCount?:number|null;
    postCount?:number|null;
    isDeactivated?: boolean;
    image?:string|null;
  }
}