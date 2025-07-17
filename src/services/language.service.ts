import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [key: string]: { [key: string]: string } } = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.inventory': 'Inventory',
      'nav.financing': 'Financing',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.language': 'Language',
      
      // Header
      'header.title': 'California Auto Mall',
      'header.subtitle': 'Your Trusted Car Dealer',
      'header.phone': 'Call Us: (555) 123-4567',
      
      // Hero Section
      'hero.title': 'Find Your Perfect Car',
      'hero.subtitle': 'Discover quality vehicles at unbeatable prices',
      'hero.search_placeholder': 'Search by make, model, or keyword...',
      'hero.search_button': 'Search',
      'hero.view_inventory': 'View All Inventory',
      
      // Search & Filters
      'search.all_makes': 'All Makes',
      'search.all_models': 'All Models',
      'search.all_years': 'All Years',
      'search.min_price': 'Min Price',
      'search.max_price': 'Max Price',
      'search.max_mileage': 'Max Mileage',
      'search.body_style': 'Body Style',
      'search.transmission': 'Transmission',
      'search.fuel_type': 'Fuel Type',
      'search.condition': 'Condition',
      'search.new': 'New',
      'search.used': 'Used',
      'search.all_conditions': 'All Conditions',
      'search.clear_filters': 'Clear Filters',
      'search.apply_filters': 'Apply Filters',
      
      // Car Listing
      'listing.featured': 'Featured',
      'listing.new': 'New',
      'listing.used': 'Used',
      'listing.starting_at': 'Starting at',
      'listing.view_details': 'View Details',
      'listing.contact_dealer': 'Contact Dealer',
      'listing.no_results': 'No vehicles found matching your criteria.',
      'listing.showing_results': 'Showing {{start}} - {{end}} of {{total}} vehicles',
      'listing.load_more': 'Load More',
      
      // Car Details
      'details.overview': 'Overview',
      'details.specifications': 'Specifications',
      'details.features': 'Features',
      'details.contact': 'Contact',
      'details.price': 'Price',
      'details.mileage': 'Mileage',
      'details.exterior': 'Exterior',
      'details.interior': 'Interior',
      'details.transmission': 'Transmission',
      'details.fuel_type': 'Fuel Type',
      'details.drivetrain': 'Drivetrain',
      'details.engine': 'Engine',
      'details.body_style': 'Body Style',
      'details.year': 'Year',
      'details.make': 'Make',
      'details.model': 'Model',
      'details.vin': 'VIN',
      'details.stock': 'Stock #',
      'details.mpg': 'MPG',
      'details.city': 'City',
      'details.highway': 'Highway',
      'details.doors': 'Doors',
      'details.seats': 'Seats',
      'details.schedule_test_drive': 'Schedule Test Drive',
      'details.get_financing': 'Get Financing',
      'details.call_now': 'Call Now',
      
      // Footer
      'footer.about_title': 'About California Auto Mall',
      'footer.about_text': 'We are your trusted automotive partner, providing quality vehicles and exceptional service since 1995.',
      'footer.contact_title': 'Contact Info',
      'footer.hours_title': 'Hours',
      'footer.hours_weekdays': 'Monday - Friday: 9:00 AM - 8:00 PM',
      'footer.hours_saturday': 'Saturday: 9:00 AM - 6:00 PM',
      'footer.hours_sunday': 'Sunday: 11:00 AM - 5:00 PM',
      'footer.rights': 'All rights reserved.',
      
      // Common
      'common.miles': 'miles',
      'common.automatic': 'Automatic',
      'common.manual': 'Manual',
      'common.gasoline': 'Gasoline',
      'common.hybrid': 'Hybrid',
      'common.electric': 'Electric',
      'common.sedan': 'Sedan',
      'common.suv': 'SUV',
      'common.truck': 'Truck',
      'common.coupe': 'Coupe',
      'common.convertible': 'Convertible',
      'common.hatchback': 'Hatchback',
      'common.wagon': 'Wagon',
      'common.awd': 'AWD',
      'common.fwd': 'FWD',
      'common.rwd': 'RWD'
    },
    es: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.inventory': 'Inventario',
      'nav.financing': 'Financiamiento',
      'nav.about': 'Acerca de',
      'nav.contact': 'Contacto',
      'nav.language': 'Idioma',
      
      // Header
      'header.title': 'California Auto Mall',
      'header.subtitle': 'Su Concesionario de Confianza',
      'header.phone': 'Llámenos: (555) 123-4567',
      
      // Hero Section
      'hero.title': 'Encuentra Tu Auto Perfecto',
      'hero.subtitle': 'Descubre vehículos de calidad a precios inmejorables',
      'hero.search_placeholder': 'Buscar por marca, modelo o palabra clave...',
      'hero.search_button': 'Buscar',
      'hero.view_inventory': 'Ver Todo el Inventario',
      
      // Search & Filters
      'search.all_makes': 'Todas las Marcas',
      'search.all_models': 'Todos los Modelos',
      'search.all_years': 'Todos los Años',
      'search.min_price': 'Precio Mín',
      'search.max_price': 'Precio Máx',
      'search.max_mileage': 'Kilometraje Máx',
      'search.body_style': 'Tipo de Carrocería',
      'search.transmission': 'Transmisión',
      'search.fuel_type': 'Tipo de Combustible',
      'search.condition': 'Condición',
      'search.new': 'Nuevo',
      'search.used': 'Usado',
      'search.all_conditions': 'Todas las Condiciones',
      'search.clear_filters': 'Limpiar Filtros',
      'search.apply_filters': 'Aplicar Filtros',
      
      // Car Listing
      'listing.featured': 'Destacado',
      'listing.new': 'Nuevo',
      'listing.used': 'Usado',
      'listing.starting_at': 'Desde',
      'listing.view_details': 'Ver Detalles',
      'listing.contact_dealer': 'Contactar Concesionario',
      'listing.no_results': 'No se encontraron vehículos que coincidan con sus criterios.',
      'listing.showing_results': 'Mostrando {{start}} - {{end}} de {{total}} vehículos',
      'listing.load_more': 'Cargar Más',
      
      // Car Details
      'details.overview': 'Resumen',
      'details.specifications': 'Especificaciones',
      'details.features': 'Características',
      'details.contact': 'Contacto',
      'details.price': 'Precio',
      'details.mileage': 'Kilometraje',
      'details.exterior': 'Exterior',
      'details.interior': 'Interior',
      'details.transmission': 'Transmisión',
      'details.fuel_type': 'Tipo de Combustible',
      'details.drivetrain': 'Tracción',
      'details.engine': 'Motor',
      'details.body_style': 'Tipo de Carrocería',
      'details.year': 'Año',
      'details.make': 'Marca',
      'details.model': 'Modelo',
      'details.vin': 'VIN',
      'details.stock': 'Stock #',
      'details.mpg': 'MPG',
      'details.city': 'Ciudad',
      'details.highway': 'Carretera',
      'details.doors': 'Puertas',
      'details.seats': 'Asientos',
      'details.schedule_test_drive': 'Programar Prueba de Manejo',
      'details.get_financing': 'Obtener Financiamiento',
      'details.call_now': 'Llamar Ahora',
      
      // Footer
      'footer.about_title': 'Acerca de California Auto Mall',
      'footer.about_text': 'Somos su socio automotriz de confianza, brindando vehículos de calidad y servicio excepcional desde 1995.',
      'footer.contact_title': 'Información de Contacto',
      'footer.hours_title': 'Horarios',
      'footer.hours_weekdays': 'Lunes - Viernes: 9:00 AM - 8:00 PM',
      'footer.hours_saturday': 'Sábado: 9:00 AM - 6:00 PM',
      'footer.hours_sunday': 'Domingo: 11:00 AM - 5:00 PM',
      'footer.rights': 'Todos los derechos reservados.',
      
      // Common
      'common.miles': 'millas',
      'common.automatic': 'Automática',
      'common.manual': 'Manual',
      'common.gasoline': 'Gasolina',
      'common.hybrid': 'Híbrido',
      'common.electric': 'Eléctrico',
      'common.sedan': 'Sedán',
      'common.suv': 'SUV',
      'common.truck': 'Camioneta',
      'common.coupe': 'Coupé',
      'common.convertible': 'Convertible',
      'common.hatchback': 'Hatchback',
      'common.wagon': 'Wagon',
      'common.awd': 'AWD',
      'common.fwd': 'FWD',
      'common.rwd': 'RWD'
    }
  };

  constructor() {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('language', language);
  }

  translate(key: string, params?: { [key: string]: string | number }): string {
    const language = this.getCurrentLanguage();
    let translation = this.translations[language]?.[key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param].toString());
      });
    }
    
    return translation;
  }
}