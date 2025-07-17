import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Car, CarFilter, SearchResult } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsSubject = new BehaviorSubject<Car[]>([]);
  public cars$ = this.carsSubject.asObservable();

  private sampleCars: Car[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 32500,
      mileage: 15000,
      exterior_color: 'Midnight Black',
      interior_color: 'Gray',
      transmission: 'Automatic',
      fuel_type: 'Gasoline',
      drivetrain: 'FWD',
      engine: '2.5L 4-Cylinder',
      body_style: 'Sedan',
      vin: '1HGBH41JXMN109186',
      stock_number: 'T23001',
      images: [
        'https://images.pexels.com/photos/3972648/pexels-photo-3972648.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Backup Camera', 'Bluetooth', 'Cruise Control', 'Power Windows', 'Air Conditioning'],
      description: 'Reliable and fuel-efficient sedan perfect for daily commuting.',
      is_featured: true,
      is_new: false,
      mpg_city: 28,
      mpg_highway: 39,
      doors: 4,
      seats: 5
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      price: 38900,
      mileage: 5000,
      exterior_color: 'Pearl White',
      interior_color: 'Black',
      transmission: 'CVT',
      fuel_type: 'Gasoline',
      drivetrain: 'AWD',
      engine: '1.5L Turbo',
      body_style: 'SUV',
      vin: '2HKRM4H75NH123456',
      stock_number: 'H24002',
      images: [
        'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Honda Sensing', 'Sunroof', 'Heated Seats', 'Apple CarPlay', 'Android Auto'],
      description: 'Spacious and versatile SUV with advanced safety features.',
      is_featured: true,
      is_new: true,
      mpg_city: 27,
      mpg_highway: 32,
      doors: 4,
      seats: 5
    },
    {
      id: '3',
      make: 'Ford',
      model: 'F-150',
      year: 2022,
      price: 45500,
      mileage: 25000,
      exterior_color: 'Magnetic Gray',
      interior_color: 'Black',
      transmission: 'Automatic',
      fuel_type: 'Gasoline',
      drivetrain: '4WD',
      engine: '3.5L V6',
      body_style: 'Truck',
      vin: '1FTEW1E50MKE12345',
      stock_number: 'F22003',
      images: [
        'https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Towing Package', 'Bed Liner', 'Running Boards', 'Backup Camera', 'Sync 3'],
      description: 'Powerful pickup truck ready for work and play.',
      is_featured: false,
      is_new: false,
      mpg_city: 20,
      mpg_highway: 26,
      doors: 4,
      seats: 5
    },
    {
      id: '4',
      make: 'BMW',
      model: '3 Series',
      year: 2023,
      price: 52900,
      mileage: 8000,
      exterior_color: 'Alpine White',
      interior_color: 'Black',
      transmission: 'Automatic',
      fuel_type: 'Gasoline',
      drivetrain: 'RWD',
      engine: '2.0L Turbo',
      body_style: 'Sedan',
      vin: 'WBA5A5C50ND123456',
      stock_number: 'B23004',
      images: [
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Premium Package', 'Navigation', 'Leather Seats', 'Sunroof', 'Harman Kardon Sound'],
      description: 'Luxury sedan with exceptional performance and comfort.',
      is_featured: true,
      is_new: false,
      mpg_city: 26,
      mpg_highway: 36,
      doors: 4,
      seats: 5
    },
    {
      id: '5',
      make: 'Tesla',
      model: 'Model Y',
      year: 2024,
      price: 58900,
      mileage: 2000,
      exterior_color: 'Midnight Silver',
      interior_color: 'White',
      transmission: 'Single Speed',
      fuel_type: 'Electric',
      drivetrain: 'AWD',
      engine: 'Dual Motor',
      body_style: 'SUV',
      vin: '5YJYGDEE5NF123456',
      stock_number: 'T24005',
      images: [
        'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Autopilot', 'Glass Roof', 'Premium Audio', 'Supercharger Access', 'Mobile Connector'],
      description: 'Electric SUV with cutting-edge technology and impressive range.',
      is_featured: true,
      is_new: true,
      mpg_city: 131,
      mpg_highway: 117,
      doors: 4,
      seats: 5
    },
    {
      id: '6',
      make: 'Chevrolet',
      model: 'Silverado',
      year: 2023,
      price: 41500,
      mileage: 12000,
      exterior_color: 'Summit White',
      interior_color: 'Jet Black',
      transmission: 'Automatic',
      fuel_type: 'Gasoline',
      drivetrain: '4WD',
      engine: '5.3L V8',
      body_style: 'Truck',
      vin: '1GCUYDED5NZ123456',
      stock_number: 'C23006',
      images: [
        'https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Trailering Package', 'Bed Protection', 'Infotainment System', 'OnStar', 'Teen Driver'],
      description: 'Heavy-duty pickup truck built for tough jobs and adventures.',
      is_featured: false,
      is_new: false,
      mpg_city: 16,
      mpg_highway: 22,
      doors: 4,
      seats: 6
    }
  ];

  constructor() {
    this.carsSubject.next(this.sampleCars);
  }

  // Simulate API call with delay
  getCars(filter?: CarFilter): Observable<SearchResult> {
    return of(this.sampleCars).pipe(
      map(cars => {
        let filteredCars = cars;

        if (filter) {
          filteredCars = cars.filter(car => {
            if (filter.make && car.make !== filter.make) return false;
            if (filter.model && car.model !== filter.model) return false;
            if (filter.year_min && car.year < filter.year_min) return false;
            if (filter.year_max && car.year > filter.year_max) return false;
            if (filter.price_min && car.price < filter.price_min) return false;
            if (filter.price_max && car.price > filter.price_max) return false;
            if (filter.mileage_max && car.mileage > filter.mileage_max) return false;
            if (filter.body_style && car.body_style !== filter.body_style) return false;
            if (filter.transmission && car.transmission !== filter.transmission) return false;
            if (filter.fuel_type && car.fuel_type !== filter.fuel_type) return false;
            if (filter.is_new !== undefined && car.is_new !== filter.is_new) return false;
            return true;
          });
        }

        return {
          cars: filteredCars,
          total: filteredCars.length,
          page: 1,
          per_page: 20,
          total_pages: Math.ceil(filteredCars.length / 20)
        };
      }),
      delay(300) // Simulate API delay
    );
  }

  getCarById(id: string): Observable<Car | undefined> {
    return of(this.sampleCars.find(car => car.id === id)).pipe(
      delay(200)
    );
  }

  getFeaturedCars(): Observable<Car[]> {
    return of(this.sampleCars.filter(car => car.is_featured)).pipe(
      delay(200)
    );
  }

  getMakes(): Observable<string[]> {
    const makes = [...new Set(this.sampleCars.map(car => car.make))];
    return of(makes);
  }

  getModels(make?: string): Observable<string[]> {
    let cars = this.sampleCars;
    if (make) {
      cars = cars.filter(car => car.make === make);
    }
    const models = [...new Set(cars.map(car => car.model))];
    return of(models);
  }

  getYears(): Observable<number[]> {
    const years = [...new Set(this.sampleCars.map(car => car.year))].sort((a, b) => b - a);
    return of(years);
  }

  // Future API integration methods
  // These will be replaced with actual HTTP calls to .NET API
  /*
  getCarsFromApi(filter?: CarFilter): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.apiUrl}/cars`, { params: filter as any });
  }

  getCarByIdFromApi(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }
  */
}