export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  subcategory: string;
  price: number;
  priceM?: number;
  priceL?: number;
  description?: string;
  image?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}
