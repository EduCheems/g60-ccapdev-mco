export interface Cafe {
  _id?: string;           // MongoDB uses _id
  id?: number;            // For your dummy data
  name: string;           // DB uses 'name'
  title?: string;         // Dummy uses 'title'
  description: string;
  location: string;       // DB uses 'location'
  city?: string;          // Dummy uses 'city'
  operatingHours: string; // DB uses 'operatingHours'
  time?: string;          // Dummy uses 'time'
  priceRange: string;     // DB uses 'priceRange'
  price?: string;         // Dummy uses 'price'
  averages: {             // DB uses 'averages'
    sociability: number;
    ambience: number;
    food: number;
    work_friendly: number;
    service: number;
  };
  // Add other DB fields if needed
  cats?: any[];
  menu?: any[];
}