import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: mongoose.Types.ObjectId;
      name?: string;
      email?: string | null;
      role?: string;
      bio?: string|null;
      profilePicURL?: string | null;
      favoriteCatCafeID?: string | null;
      followersCount?:Number|null;
      followingCount?:Number|null;
      postCount:Number|null;
      isDeactivated?: boolean;
    };
  }

  interface User {
    id: string;
    role?: string;
    bio?: string|null;
    profilePicURL?: string | null;
    favoriteCatCafeID?: string | null;
    followersCount?:Number|null;
    followingCount?:Number|null;
    postCount:Number|null;
    favoriteCatCafeID?: string | null;
    isDeactivated?: boolean;
  }
}