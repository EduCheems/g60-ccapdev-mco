export interface Review {
  cafeId: number;
  username: string;
  timeAgo: string;
  text: string;
  likes: number;
  avatarUrl?: string;
  imageUrl?: string;
}

export const reviews: Review[] = [
  {
    cafeId: 3,
    username: "User1",
    timeAgo: "2 hours ago",
    text: "OMG Pawsome Brews has one of the best coffees I have ever tasted. Not only that, they have cats! They are super tame and friendly. I would definitely recommend it and will visit again!",
    likes: 11,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    cafeId: 4,
    username: "User2",
    timeAgo: "2 hours ago",
    text: "Neon Whiskers has always been our go to cat cafe in the city. They have a great selection of drinks and desserts. I would definitely recommend it, if you're a first time cat cafe customer.",
    likes: 18,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    cafeId: 5,
    username: "User3",
    timeAgo: "2 hours ago",
    text: "Nesting cat? More like Cat Heaven!! I always find comfort I need at the Nesting Cat Cafe. They have an abundance of friendly cat, and accommodating staff members.",
    likes: 13,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    cafeId: 6,
    username: "User4",
    timeAgo: "2 hours ago",
    text: "Do you love hot choco? Well come and visit Catnip and Cocoa, as they have the best hot choco I have ever tasted. Not only that, they have these custom cat mugs that are super cute!! This cafe is purrrfeccctt for the rainy seasons. ",
    likes: 14,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    cafeId: 7,
    username: "User5",
    timeAgo: "2 hours ago",
    text: "Are you a fan of cute and cuddling cats? Well come and try the Sunbeam Whiskers! Not only do they have an abundance of cats, but they also have one of the best carrot cakes I have ever tasted. 100% would come again and I highly recommend it for people trying out their first cat cafe. ",
    likes: 16,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }

  

];