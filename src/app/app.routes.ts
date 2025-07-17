import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CarListingComponent } from '../components/car-listing/car-listing.component';
import { CarDetailComponent } from '../components/car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: CarListingComponent },
  { path: 'car/:id', component: CarDetailComponent },
  { path: 'financing', redirectTo: '/' }, // Placeholder routes
  { path: 'about', redirectTo: '/' },
  { path: 'contact', redirectTo: '/' },
  { path: '**', redirectTo: '' }
];