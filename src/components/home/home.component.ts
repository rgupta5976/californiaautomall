import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { CarCardComponent } from '../car-card/car-card.component';
import { Car } from '../../models/car.interface';
import { CarService } from '../../services/car.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, CarCardComponent],
  template: `
    <!-- Hero Section -->
    <app-hero></app-hero>
    
    <!-- Featured Cars Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Vehicles
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of quality vehicles
          </p>
        </div>
        
        <!-- Featured Cars Grid -->
        <div *ngIf="featuredCars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-car-card 
            *ngFor="let car of featuredCars" 
            [car]="car"
            class="animate-fade-in"
          ></app-car-card>
        </div>
        
        <!-- View All Button -->
        <div class="text-center mt-12">
          <a
            routerLink="/inventory"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
          >
            View All Inventory
          </a>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive automotive solutions for all your needs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Quality Inspection</h3>
            <p class="text-gray-600">Every vehicle undergoes a comprehensive 150-point inspection</p>
          </div>
          
          <!-- Service 2 -->
          <div class="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Financing Options</h3>
            <p class="text-gray-600">Flexible financing solutions to fit your budget and credit situation</p>
          </div>
          
          <!-- Service 3 -->
          <div class="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Extended Warranties</h3>
            <p class="text-gray-600">Comprehensive warranty options to protect your investment</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Perfect Car?
        </h2>
        <p class="text-xl mb-8 text-blue-100">
          Browse our extensive inventory or schedule a test drive today
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            routerLink="/inventory"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Browse Inventory
          </a>
          <a
            routerLink="/contact"
            class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .hover\\:shadow-lg:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .transform:hover {
      transform: translateY(-2px);
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = [];

  constructor(
    private carService: CarService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedCars();
  }

  loadFeaturedCars(): void {
    this.carService.getFeaturedCars().subscribe(cars => {
      this.featuredCars = cars;
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}