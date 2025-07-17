export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  exterior_color: string;
  interior_color: string;
  transmission: string;
  fuel_type: string;
  drivetrain: string;
  engine: string;
  body_style: string;
  vin: string;
  stock_number: string;
  images: string[];
  features: string[];
  description: string;
  is_featured: boolean;
  is_new: boolean;
  mpg_city?: number;
  mpg_highway?: number;
  doors?: number;
  seats?: number;
}

export interface CarFilter {
  make?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_max?: number;
  body_style?: string;
  transmission?: string;
  fuel_type?: string;
  is_new?: boolean;
}

export interface SearchResult {
  cars: Car[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}