import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car.interface';
import { CarService } from '../../services/car.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="car">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a (click)="goBack()" class="text-blue-600 hover:text-blue-800 cursor-pointer">
              {{ translate('nav.inventory') }}
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <span class="text-gray-500 mx-2">/</span>
              <span class="text-gray-700">{{ car.year }} {{ car.make }} {{ car.model }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Gallery -->
        <div class="space-y-4">
          <div class="aspect-w-16 aspect-h-9">
            <img 
              [src]="car.images[currentImageIndex]" 
              [alt]="car.year + ' ' + car.make + ' ' + car.model"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2" *ngIf="car.images.length > 1">
            <button
              *ngFor="let image of car.images; let i = index"
              (click)="currentImageIndex = i"
              [class.ring-2]="currentImageIndex === i"
              [class.ring-blue-500]="currentImageIndex === i"
              class="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            >
              <img 
                [src]="image" 
                [alt]="'Image ' + (i + 1)"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Car Details -->
        <div class="space-y-6">
          <!-- Header -->
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <span 
                *ngIf="car.is_featured"
                class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ translate('listing.featured') }}
              </span>
              <span 
                [class]="car.is_new ? 'bg-green-500' : 'bg-blue-500'"
                class="text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ car.is_new ? translate('listing.new') : translate('listing.used') }}
              </span>
            </div>
            
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              {{ car.year }} {{ car.make }} {{ car.model }}
            </h1>
            
            <div class="text-3xl font-bold text-blue-600 mb-4">
              \${{ car.price | number }}
            </div>
            
            <p class="text-gray-600 mb-6">{{ car.description }}</p>
          </div>

          <!-- Key Specs -->
          <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ car.mileage | number }}</div>
              <div class="text-sm text-gray-600">{{ translate('common.miles') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ car.year }}</div>
              <div class="text-sm text-gray-600">{{ translate('details.year') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ translate('common.' + car.transmission.toLowerCase()) }}</div>
              <div class="text-sm text-gray-600">{{ translate('details.transmission') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">{{ translate('common.' + car.fuel_type.toLowerCase()) }}</div>
              <div class="text-sm text-gray-600">{{ translate('details.fuel_type') }}</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button 
              (click)="scheduleTestDrive()"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              {{ translate('details.schedule_test_drive') }}
            </button>
            
            <button 
              (click)="getFinancing()"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              {{ translate('details.get_financing') }}
            </button>
            
            <button 
              (click)="callNow()"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              {{ translate('details.call_now') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Detailed Information Tabs -->
      <div class="mt-12">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8">
            <button
              *ngFor="let tab of tabs; let i = index"
              (click)="activeTab = i"
              [class.border-blue-500]="activeTab === i"
              [class.text-blue-600]="activeTab === i"
              class="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              {{ translate(tab.label) }}
            </button>
          </nav>
        </div>

        <div class="mt-6">
          <!-- Overview Tab -->
          <div *ngIf="activeTab === 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800">Vehicle Information</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.make') }}:</span>
                  <span class="font-medium">{{ car.make }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.model') }}:</span>
                  <span class="font-medium">{{ car.model }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.year') }}:</span>
                  <span class="font-medium">{{ car.year }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.body_style') }}:</span>
                  <span class="font-medium">{{ translate('common.' + car.body_style.toLowerCase()) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.exterior') }}:</span>
                  <span class="font-medium">{{ car.exterior_color }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.interior') }}:</span>
                  <span class="font-medium">{{ car.interior_color }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800">Technical Details</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.engine') }}:</span>
                  <span class="font-medium">{{ car.engine }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.transmission') }}:</span>
                  <span class="font-medium">{{ translate('common.' + car.transmission.toLowerCase()) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.drivetrain') }}:</span>
                  <span class="font-medium">{{ translate('common.' + car.drivetrain.toLowerCase()) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.fuel_type') }}:</span>
                  <span class="font-medium">{{ translate('common.' + car.fuel_type.toLowerCase()) }}</span>
                </div>
                <div class="flex justify-between" *ngIf="car.mpg_city && car.mpg_highway">
                  <span class="text-gray-600">{{ translate('details.mpg') }}:</span>
                  <span class="font-medium">{{ car.mpg_city }} {{ translate('details.city') }} / {{ car.mpg_highway }} {{ translate('details.highway') }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.vin') }}:</span>
                  <span class="font-medium font-mono text-sm">{{ car.vin }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ translate('details.stock') }}:</span>
                  <span class="font-medium">{{ car.stock_number }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Tab -->
          <div *ngIf="activeTab === 1">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Standard Features</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div 
                *ngFor="let feature of car.features" 
                class="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
              >
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-sm text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="!car && !loading" class="text-center py-12">
      <p class="text-gray-600">Car not found</p>
    </div>

    <div *ngIf="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Loading vehicle details...</p>
    </div>
  `,
  styles: [`
    .aspect-w-16 {
      position: relative;
      width: 100%;
    }
    
    .aspect-h-9 {
      padding-bottom: 56.25%;
    }
    
    .aspect-w-16 img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .aspect-square {
      aspect-ratio: 1;
    }
    
    button {
      transition: all 0.2s ease;
    }
    
    button:hover {
      transform: translateY(-1px);
    }
  `]
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  loading = false;
  currentImageIndex = 0;
  activeTab = 0;

  tabs = [
    { label: 'details.overview' },
    { label: 'details.features' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = params['id'];
      if (carId) {
        this.loadCar(carId);
      }
    });
  }

  loadCar(id: string): void {
    this.loading = true;
    this.carService.getCarById(id).subscribe(
      car => {
        this.car = car || null;
        this.loading = false;
      },
      error => {
        console.error('Error loading car:', error);
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/inventory']);
  }

  scheduleTestDrive(): void {
    // Future implementation
    console.log('Schedule test drive for car:', this.car?.id);
  }

  getFinancing(): void {
    // Future implementation
    console.log('Get financing for car:', this.car?.id);
  }

  callNow(): void {
    // Future implementation
    console.log('Call now for car:', this.car?.id);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}