export interface Cafe {
  id: number;
  slug: string;      
  title: string;
  imageUrl: string;
  tags: string[];
  price: string;
  city: string;
  time: string;
  ratings: Record<string, number>;
}

export const cafes: Cafe[] = [
  {
    id: 1,
    slug: "cozy-cat-cafe",
    title: "Cozy Cat Cafe",
    imageUrl: "/images/cafe1.jpg",
    tags: ["Work-friendly", "Aesthetic"],
    price: "₱200-₱500",
    city: "Manila",
    time: "10AM - 8PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 4, Service: 3 }
  },
  {
    id: 2,
    slug: "mew-mew-lounge",
    title: "Mew Mew Lounge",
    imageUrl: "/images/cafe2.jpg",
    tags: ["Refreshing", "Aesthetic"],
    price: "₱150-₱400",
    city: "Quezon City",
    time: "9AM - 9PM",
    ratings: { Sociability: 4, Ambience: 5, Food: 4, Catmosphere: 5, Service: 4 }
  },
  // Add more cafes here...
];