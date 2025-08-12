import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'services', loadComponent: () => import('./pages/services/services').then(m => m.Services) },
  { path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products) },
  { path: 'careers', loadComponent: () => import('./pages/careers/careers').then(m => m.Careers) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  { path: '**', redirectTo: '/home' }
];
