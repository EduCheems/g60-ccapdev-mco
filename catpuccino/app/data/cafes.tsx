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
    imageUrl: "/images/BestService/GoldenWhisker.jpg",
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
    imageUrl: "/images/BestService/AlleyPawCafe.jpg",
    tags: ["Refreshing", "Aesthetic"],
    price: "₱150-₱400",
    city: "Quezon City",
    time: "9AM - 9PM",
    ratings: { Sociability: 4, Ambience: 5, Food: 4, Catmosphere: 5, Service: 4 }
  },
  {
    id: 3,
    slug: "pawsome-brews",
    title: "Pawsome Brews",
    imageUrl: "/images/Friendly/PawsomeBrews.jpeg",
    tags: ["Date-friendly", "Aesthetic"],
    price: "₱150-₱350",
    city: "Quezon City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 4, Catmosphere: 5, Service: 3 }
  },
  {
    id: 4,
    slug: "neon-whiskers",
    title: "Neon Whiskers",
    imageUrl: "/images/Friendly/NeonWhiskers.jpg",
    tags: ["Study-friendly", "Minimalist"],
    price: "₱120-₱400",
    city: "Makati City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 5, Service: 4 }
  },
  {
    id: 5,
    slug: "nesting-cat",
    title: "Nesting Cat",
    imageUrl: "/images/Friendly/NestingCat.jpg",
    tags: ["Work-friendly", "Quiet"],
    price: "₱170-₱370",
    city: "Pasay City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 4, Catmosphere: 3, Service: 3 }
  },
  {
    id: 6,
    slug: "catnip-cocoa",
    title: "Catnip & Cocoa",
    imageUrl: "/images/Friendly/Catnip&Cocoa.jpeg",
    tags: ["Free Wi-Fi", "Minimalist"],
    price: "₱130-₱310",
    city: "Taguig City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 3, Food: 5, Catmosphere: 5, Service: 5 }
  },
  {
    id: 7,
    slug: "sunbeam-whiskers",
    title: "Sunbeam Whiskers",
    imageUrl: "/images/Friendly/SunbeamWhiskers.jpg",
    tags: ["Cozy", "Warm"],
    price: "₱150-₱400",
    city: "Manila",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 5, Service: 3 }
  },
  {
    id: 8,
    slug: "brew-meow",
    title: "Brew & Meow",
    imageUrl: "/images/Friendly/Brew&Meow.jpg",
    tags: ["Aesthetic", "Work-friendly"],
    price: "₱120-₱300",
    city: "Caloocan City",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 3, Catmosphere: 5, Service: 4 }
  },
  {
    id: 9,
    slug: "nuzzle-nap",
    title: "Nuzzle & Nap",
    imageUrl: "/images/Friendly/Nuzzle&Nap.jpg",
    tags: ["Date-friendly", "Free Wi-Fi"],
    price: "₱100-₱350",
    city: "Parañaque City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 5, Catmosphere: 4, Service: 5 }
  },
  {
    id: 10,
    slug: "cats-cradle-cafe",
    title: "Cat’s Cradle Café",
    imageUrl: "/images/Friendly/Cat'sCradleCafe.jpg",
    tags: ["Quiet", "Minimalist"],
    price: "₱200-₱360",
    city: "Mandaluyong City",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 4, Catmosphere: 5, Service: 4 }
  },
  {
    id: 11,
    slug: "gentle-purr",
    title: "Gentle Purr",
    imageUrl: "/images/Friendly/GentlePurr.jpg",
    tags: ["Quiet", "Date-friendly"],
    price: "₱100-₱340",
    city: "Marikina City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 4, Catmosphere: 3, Service: 5 }
  },
  {
    id: 12,
    slug: "catfe-society",
    title: "Catfé Society",
    imageUrl: "/images/Friendly/CatfeSociety.jpeg",
    tags: ["Work-friendly", "Minimalist"],
    price: "₱150-₱350",
    city: "Valenzuela City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 4, Catmosphere: 3, Service: 5 }
  },
  {
    id: 13,
    slug: "purrk-beans",
    title: "Purrk & Beans",
    imageUrl: "/images/Underrated/Purrk&Beans.jpg",
    tags: ["Chill", "Work-friendly"],
    price: "₱200-₱300",
    city: "Las Piñas City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 3, Service: 3 }
  },
  {
    id: 14,
    slug: "catte-latte",
    title: "Catté Latte",
    imageUrl: "/images/Underrated/CatteLatte.jpeg",
    tags: ["Study-friendly", "Quiet"],
    price: "₱150-₱350",
    city: "Navotas City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 3, Ambience: 4, Food: 5, Catmosphere: 4, Service: 3 }
  },
  {
    id: 15,
    slug: "the-meowtrix",
    title: "The Meowtrix",
    imageUrl: "/images/Underrated/TheMeowtrix.jpg",
    tags: ["Spot", "Cozy"],
    price: "₱175-₱350",
    city: "Muntinlupa City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 3, Catmosphere: 5, Service: 5 }
  },
  {
    id: 16,
    slug: "whiskerlines",
    title: "Whiskerlines",
    imageUrl: "/images/Underrated/Whiskerelines.jpg",
    tags: ["Minimalist", "Spot"],
    price: "₱100-₱400",
    city: "Malabon City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 3, Catmosphere: 5, Service: 3 }
  },
  {
    id: 17,
    slug: "cat-coven",
    title: "Cat Coven",
    imageUrl: "/images/Underrated/CatCoven.jpg",
    tags: ["Chill", "Work-friendly"],
    price: "₱200-₱375",
    city: "San Juan City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 3, Ambience: 5, Food: 5, Catmosphere: 4, Service: 4 }
  },
  {
    id: 18,
    slug: "the-third-paw",
    title: "The Third Paw",
    imageUrl: "/images/Underrated/TheThirdPaw.jpg",
    tags: ["Spot", "Work-friendly"],
    price: "₱150-₱350",
    city: "Pasig City",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 3, Catmosphere: 5, Service: 3 }
  },
  {
    id: 19,
    slug: "alley-nine",
    title: "Alley Nine",
    imageUrl: "/images/Underrated/AlleyNine.jpeg",
    tags: ["Spot", "Trendy"],
    price: "₱125-₱300",
    city: "Quezon City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 3, Ambience: 4, Food: 5, Catmosphere: 4, Service: 5 }
  },
  {
    id: 20,
    slug: "neko-no-yume",
    title: "Neko no Yume",
    imageUrl: "/images/Underrated/NekoNoYume.jpg",
    tags: ["Spot", "Cozy"],
    price: "₱200-₱400",
    city: "Taguig City",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 4, Ambience: 3, Food: 4, Catmosphere: 3, Service: 4 }
  },
  {
    id: 21,
    slug: "rooftop-paws",
    title: "Rooftop Paws",
    imageUrl: "/images/Underrated/RooftopPaws.jpeg",
    tags: ["Cozy", "Spot"],
    price: "₱150-₱300",
    city: "Manila",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 5, Catmosphere: 5, Service: 3 }
  },
  {
    id: 22,
    slug: "soft-paw",
    title: "Soft Paw",
    imageUrl: "/images/Underrated/SoftPaw.webp",
    tags: ["Date-friendly", "Aesthetic"],
    price: "₱100-₱400",
    city: "Makati City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 3, Ambience: 5, Food: 4, Catmosphere: 4, Service: 5 }
  },
  {
    id: 23,
    slug: "clawffee-company",
    title: "Clawffee & Company",
    imageUrl: "/images/Sociable/Clawffee&Company.jpg",
    tags: ["Chill", "Date-friendly"],
    price: "₱100-₱300",
    city: "San Juan City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 3, Ambience: 5, Food: 5, Catmosphere: 4, Service: 4 }
  },
  {
    id: 24,
    slug: "sugar-paws",
    title: "Sugar Paws",
    imageUrl: "/images/Sociable/SugarPaws.jpg",
    tags: ["Spot", "Work-friendly"],
    price: "₱150-₱375",
    city: "Pasig City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 4, Ambience: 4, Food: 5, Catmosphere: 5, Service: 3 }
  },
  {
    id: 25,
    slug: "midnight-whiskers-cafe",
    title: "Midnight Whiskers Café",
    imageUrl: "/images/Sociable/MidnightWhiskersCafe.jpg",
    tags: ["Study-friendly", "Cozy"],
    price: "₱150-₱300",
    city: "Quezon City",
    time: "8:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 4, Catmosphere: 4, Service: 4 }
  },
  {
    id: 26,
    slug: "gatto-nero-coffee",
    title: "Gatto Nero Coffee",
    imageUrl: "/images/Sociable/GattoNeroCoffee.jpg",
    tags: ["Trendy", "Aesthetic"],
    price: "₱100-₱300",
    city: "Makati City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 3, Ambience: 4, Food: 5, Catmosphere: 5, Service: 5 }
  },
  {
    id: 27,
    slug: "whisker-society",
    title: "Whisker Society",
    imageUrl: "/images/Sociable/WhiskerSociety.jpg",
    tags: ["Study-friendly", "Free Wi-Fi"],
    price: "₱100-₱350",
    city: "Taguig City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 3, Catmosphere: 4, Service: 3 }
  },
  {
    id: 28,
    slug: "hidden-whisker",
    title: "Hidden Whisker",
    imageUrl: "/images/Sociable/HiddenWhisker.jpg",
    tags: ["Trendy", "Work-friendly"],
    price: "₱200-₱300",
    city: "Manila",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 3, Ambience: 4, Food: 3, Catmosphere: 4, Service: 4 }
  },
  {
    id: 29,
    slug: "hello-cat",
    title: "Hello, Cat",
    imageUrl: "/images/Sociable/HelloCat.jpg",
    tags: ["Chill", "Study-friendly"],
    price: "₱100-₱400",
    city: "Pasay City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 5, Service: 5 }
  },
  {
    id: 30,
    slug: "little-tail-lounge",
    title: "Little Tail Lounge",
    imageUrl: "/images/Sociable/LittleTailLounge.jpg",
    tags: ["Work-friendly", "Cozy"],
    price: "₱150-₱300",
    city: "Caloocan City",
    time: "8:00 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 3, Catmosphere: 5, Service: 5 }
  },
  {
    id: 31,
    slug: "whiskers-words",
    title: "Whiskers & Words",
    imageUrl: "/images/Sociable/Whisker&Words.jpg",
    tags: ["Cozy", "Quiet"],
    price: "₱150-₱375",
    city: "Parañaque City",
    time: "7:30 AM - 10:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 3, Catmosphere: 5, Service: 4 }
  },
  {
    id: 32,
    slug: "novelty-paws",
    title: "Novelty Paws",
    imageUrl: "/images/Sociable/NoveltyPaws.jpg",
    tags: ["Chill", "Unique"],
    price: "₱175-₱300",
    city: "Mandaluyong City",
    time: "9:00 AM - 11:00 PM",
    ratings: { Sociability: 5, Ambience: 5, Food: 4, Catmosphere: 5, Service: 5 }
  }
];