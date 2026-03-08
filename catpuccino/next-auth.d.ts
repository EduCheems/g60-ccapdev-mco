import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: mongoose.Types.ObjectId;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      profile?: {
        firstName: string| null;
        lastName: string| null;
        profilePicURL?: string | null;
        coverPicURL?: string | null;
        bio?: string|null;
        shortDescription?: string|null;
      };
      favoriteCatCafeID?: string | null;
      isDeactivated?: boolean;
    };
  }

  interface User {
    id: string;
    role?: string;
    profile?: {
      firstName: string;
      lastName: string;
      profilePicURL?: string | null;
      coverPicURL?: string | null;
      bio?: string;
      shortDescription?: string;
    };
    favoriteCatCafeID?: string | null;
    isDeactivated?: boolean;
  }
}