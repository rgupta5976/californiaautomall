import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-blue-900 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <!-- Top Bar -->
        <div class="flex justify-between items-center py-2 text-sm border-b border-blue-800">
          <div class="flex items-center space-x-4">
            <span>{{ translate('header.phone') }}</span>
            <span>•</span>
            <span>{{ translate('header.subtitle') }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <span>{{ translate('nav.language') }}:</span>
            <select 
              (change)="changeLanguage($event)"
              [value]="currentLanguage"
              class="bg-blue-800 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        
        <!-- Main Navigation -->
        <nav class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
              {{ translate('header.title') }}
            </a>
          </div>
          
          <div class="hidden md:flex space-x-8">
            <a routerLink="/" routerLinkActive="text-blue-200" [routerLinkActiveOptions]="{exact: true}" 
               class="nav-link hover:text-blue-200 transition-colors">
              {{ translate('nav.home') }}
            </a>
            <a routerLink="/inventory" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors">
              {{ translate('nav.inventory') }}
            </a>
            <a routerLink="/financing" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors">
              {{ translate('nav.financing') }}
            </a>
            <a routerLink="/about" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors">
              {{ translate('nav.about') }}
            </a>
            <a routerLink="/contact" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors">
              {{ translate('nav.contact') }}
            </a>
          </div>
          
          <!-- Mobile menu button -->
          <button 
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>
        
        <!-- Mobile Menu -->
        <div class="md:hidden pb-4" [class.hidden]="!mobileMenuOpen">
          <div class="flex flex-col space-y-2">
            <a routerLink="/" routerLinkActive="text-blue-200" [routerLinkActiveOptions]="{exact: true}" 
               class="nav-link hover:text-blue-200 transition-colors py-2">
              {{ translate('nav.home') }}
            </a>
            <a routerLink="/inventory" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors py-2">
              {{ translate('nav.inventory') }}
            </a>
            <a routerLink="/financing" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors py-2">
              {{ translate('nav.financing') }}
            </a>
            <a routerLink="/about" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors py-2">
              {{ translate('nav.about') }}
            </a>
            <a routerLink="/contact" routerLinkActive="text-blue-200" 
               class="nav-link hover:text-blue-200 transition-colors py-2">
              {{ translate('nav.contact') }}
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .nav-link {
      position: relative;
      font-weight: 500;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #60a5fa;
      transition: width 0.3s ease;
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    .router-link-active::after {
      width: 100%;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentLanguage: Language = 'en';
  mobileMenuOpen = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.languageService.setLanguage(target.value as Language);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}