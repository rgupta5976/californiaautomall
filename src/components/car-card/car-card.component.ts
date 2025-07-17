import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../models/car.interface';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="car-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <!-- Image Container -->
      <div class="relative">
        <img 
          [src]="car.images[0]" 
          [alt]="car.year + ' ' + car.make + ' ' + car.model"
          class="w-full h-48 object-cover"
        />
        
        <!-- Badges -->
        <div class="absolute top-4 left-4 flex flex-col space-y-2">
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
        
        <!-- Price -->
        <div class="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
          <span class="text-sm">{{ translate('listing.starting_at') }}</span>
          <div class="text-lg font-bold">\${{ car.price | number }}</div>
        </div>
      </div>
      
      <!-- Card Content -->
      <div class="p-6">
        <!-- Title -->
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          {{ car.year }} {{ car.make }} {{ car.model }}
        </h3>
        
        <!-- Details -->
        <div class="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            {{ car.mileage | number }} {{ translate('common.miles') }}
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ translate('common.' + car.transmission.toLowerCase()) }}
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"/>
            </svg>
            {{ translate('common.' + car.fuel_type.toLowerCase()) }}
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ translate('common.' + car.drivetrain.toLowerCase()) }}
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-gray-600 mb-4 text-sm line-clamp-2">
          {{ car.description }}
        </p>
        
        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <a 
            [routerLink]="['/car', car.id]"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ translate('listing.view_details') }}
          </a>
          <button 
            (click)="contactDealer()"
            class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ translate('listing.contact_dealer') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .car-card {
      transition: all 0.3s ease;
    }
    
    .car-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class CarCardComponent {
  @Input() car!: Car;

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  contactDealer(): void {
    // Future implementation: open contact modal or navigate to contact page
    console.log('Contact dealer for car:', this.car.id);
  }
}