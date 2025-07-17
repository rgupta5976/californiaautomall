import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="hero-section bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {{ translate('hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl mb-12 text-blue-100 animate-fade-in-delay">
            {{ translate('hero.subtitle') }}
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8 animate-slide-up">
            <div class="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                [placeholder]="translate('hero.search_placeholder')"
                class="flex-1 px-6 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                (click)="search()"
                class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-colors duration-300 transform hover:scale-105"
              >
                {{ translate('hero.search_button') }}
              </button>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div class="animate-slide-up-delay">
            <a
              routerLink="/inventory"
              class="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
            >
              {{ translate('hero.view_inventory') }}
            </a>
          </div>
          
          <!-- Stats -->
          <div class="flex justify-center space-x-8 mt-16 animate-fade-in-delay">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-400">500+</div>
              <div class="text-blue-100">{{ translate('nav.inventory') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-400">25+</div>
              <div class="text-blue-100">Years Experience</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-400">15k+</div>
              <div class="text-blue-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%);
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,100 1000,0"/></svg>');
      background-size: cover;
      pointer-events: none;
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }
    
    .animate-fade-in-delay {
      animation: fadeIn 1s ease-out 0.3s both;
    }
    
    .animate-slide-up {
      animation: slideUp 1s ease-out 0.6s both;
    }
    
    .animate-slide-up-delay {
      animation: slideUp 1s ease-out 0.9s both;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeroComponent implements OnInit {
  searchQuery = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  search(): void {
    if (this.searchQuery.trim()) {
      // Navigate to inventory with search query
      console.log('Searching for:', this.searchQuery);
      // Future implementation: navigate to inventory with search parameters
    }
  }
}