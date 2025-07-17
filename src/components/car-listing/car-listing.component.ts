import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car, CarFilter } from '../../models/car.interface';
import { CarService } from '../../services/car.service';
import { LanguageService } from '../../services/language.service';
import { CarCardComponent } from '../car-card/car-card.component';
import { CarSearchComponent } from '../car-search/car-search.component';

@Component({
  selector: 'app-car-listing',
  standalone: true,
  imports: [CommonModule, CarCardComponent, CarSearchComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Search Component -->
      <app-car-search (filtersChanged)="onFiltersChanged($event)"></app-car-search>
      
      <!-- Results Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ translate('nav.inventory') }}
        </h2>
        <div class="text-gray-600" *ngIf="cars.length > 0">
          {{ translate('listing.showing_results', {
            start: '1',
            end: cars.length.toString(),
            total: totalCars.toString()
          }) }}
        </div>
      </div>
      
      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading vehicles...</p>
      </div>
      
      <!-- No Results -->
      <div *ngIf="!loading && cars.length === 0" class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No Vehicles Found</h3>
        <p class="text-gray-600">{{ translate('listing.no_results') }}</p>
      </div>
      
      <!-- Car Grid -->
      <div *ngIf="!loading && cars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-car-card 
          *ngFor="let car of cars; trackBy: trackByCarId" 
          [car]="car"
          class="animate-fade-in"
        ></app-car-card>
      </div>
      
      <!-- Load More Button -->
      <div *ngIf="!loading && cars.length > 0 && hasMore" class="text-center mt-8">
        <button 
          (click)="loadMore()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
        >
          {{ translate('listing.load_more') }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .grid {
      gap: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1025px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class CarListingComponent implements OnInit {
  cars: Car[] = [];
  loading = false;
  totalCars = 0;
  hasMore = false;
  currentFilters: CarFilter = {};

  constructor(
    private carService: CarService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(filters?: CarFilter): void {
    this.loading = true;
    this.currentFilters = filters || {};
    
    this.carService.getCars(this.currentFilters).subscribe(
      result => {
        this.cars = result.cars;
        this.totalCars = result.total;
        this.hasMore = result.total > result.cars.length;
        this.loading = false;
      },
      error => {
        console.error('Error loading cars:', error);
        this.loading = false;
      }
    );
  }

  onFiltersChanged(filters: CarFilter): void {
    this.loadCars(filters);
  }

  loadMore(): void {
    // Future implementation for pagination
    console.log('Load more cars');
  }

  trackByCarId(index: number, car: Car): string {
    return car.id;
  }

  translate(key: string, params?: { [key: string]: string }): string {
    return this.languageService.translate(key, params);
  }
}