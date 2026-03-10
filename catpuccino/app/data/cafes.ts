
//Menu item interface 
export interface MenuItem {
  itemName: string;
  price: number;
  description: string;
  pictureUrl: string;
}

//Cat Object interface 
export interface CatItem {
  name: string;
  breed: string;
  description: string;
  pictureUrl: string;
}

//Cafe interface 
export interface Cafe {
  _id: string;        
  ownerID: string;
  name: string;       
  description: string;
  location: string;   
  operatingHours: string; 
  priceRange: string;     
  averages: {
    sociability: number;
    ambience: number;
    food: number;
    work_friendly: number;
    service: number;
  };
  totalReviews: number;
  cats: CatItem[];
  menu: MenuItem[];
}

export const cafes: Cafe[] = [];