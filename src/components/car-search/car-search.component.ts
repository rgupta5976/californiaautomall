import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarFilter } from '../../models/car.interface';
import { CarService } from '../../services/car.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-car-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Search & Filter</h2>
      
      <!-- Search Form -->
      <form (ngSubmit)="applyFilters()" class="space-y-4">
        <!-- Row 1: Make, Model, Year -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <select 
              [(ngModel)]="filters.make" 
              name="make"
              (change)="onMakeChange()"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{{ translate('search.all_makes') }}</option>
              <option *ngFor="let make of makes" [value]="make">{{ make }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <select 
              [(ngModel)]="filters.model" 
              name="model"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{{ translate('search.all_models') }}</option>
              <option *ngFor="let model of models" [value]="model">{{ model }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <div class="grid grid-cols-2 gap-2">
              <select 
                [(ngModel)]="filters.year_min" 
                name="year_min"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Min</option>
                <option *ngFor="let year of years" [value]="year">{{ year }}</option>
              </select>
              <select 
                [(ngModel)]="filters.year_max" 
                name="year_max"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Max</option>
                <option *ngFor="let year of years" [value]="year">{{ year }}</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Row 2: Price Range -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.min_price') }}</label>
            <input 
              type="number" 
              [(ngModel)]="filters.price_min" 
              name="price_min"
              placeholder="$0"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.max_price') }}</label>
            <input 
              type="number" 
              [(ngModel)]="filters.price_max" 
              name="price_max"
              placeholder="$100,000"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <!-- Row 3: Additional Filters -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.max_mileage') }}</label>
            <input 
              type="number" 
              [(ngModel)]="filters.mileage_max" 
              name="mileage_max"
              placeholder="100,000"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.body_style') }}</label>
            <select 
              [(ngModel)]="filters.body_style" 
              name="body_style"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Sedan">{{ translate('common.sedan') }}</option>
              <option value="SUV">{{ translate('common.suv') }}</option>
              <option value="Truck">{{ translate('common.truck') }}</option>
              <option value="Coupe">{{ translate('common.coupe') }}</option>
              <option value="Convertible">{{ translate('common.convertible') }}</option>
              <option value="Hatchback">{{ translate('common.hatchback') }}</option>
              <option value="Wagon">{{ translate('common.wagon') }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.transmission') }}</label>
            <select 
              [(ngModel)]="filters.transmission" 
              name="transmission"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Automatic">{{ translate('common.automatic') }}</option>
              <option value="Manual">{{ translate('common.manual') }}</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translate('search.condition') }}</label>
            <select 
              [(ngModel)]="conditionFilter" 
              name="condition"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{{ translate('search.all_conditions') }}</option>
              <option value="new">{{ translate('search.new') }}</option>
              <option value="used">{{ translate('search.used') }}</option>
            </select>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex space-x-4 pt-4">
          <button 
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {{ translate('search.apply_filters') }}
          </button>
          
          <button 
            type="button"
            (click)="clearFilters()"
            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            {{ translate('search.clear_filters') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .grid {
      gap: 1rem;
    }
    
    input:focus, select:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    button {
      transition: all 0.2s ease;
    }
    
    button:hover {
      transform: translateY(-1px);
    }
  `]
})
export class CarSearchComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<CarFilter>();

  filters: CarFilter = {};
  conditionFilter = '';
  makes: string[] = [];
  models: string[] = [];
  years: number[] = [];

  constructor(
    private carService: CarService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    this.carService.getMakes().subscribe(makes => {
      this.makes = makes;
    });

    this.carService.getModels().subscribe(models => {
      this.models = models;
    });

    this.carService.getYears().subscribe(years => {
      this.years = years;
    });
  }

  onMakeChange(): void {
    if (this.filters.make) {
      this.carService.getModels(this.filters.make).subscribe(models => {
        this.models = models;
        this.filters.model = ''; // Reset model when make changes
      });
    } else {
      this.carService.getModels().subscribe(models => {
        this.models = models;
      });
    }
  }

  applyFilters(): void {
    const cleanFilters: CarFilter = {};

    // Clean up filters to remove empty values
    Object.keys(this.filters).forEach(key => {
      const value = this.filters[key as keyof CarFilter];
      if (value !== '' && value !== null && value !== undefined) {
        (cleanFilters as any)[key] = value;
      }
    });

    // Handle condition filter
    if (this.conditionFilter) {
      cleanFilters.is_new = this.conditionFilter === 'new';
    }

    this.filtersChanged.emit(cleanFilters);
  }

  clearFilters(): void {
    this.filters = {};
    this.conditionFilter = '';
    this.loadFilterOptions();
    this.filtersChanged.emit({});
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}