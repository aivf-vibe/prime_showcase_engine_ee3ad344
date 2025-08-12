import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {
  services: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.services = data.map(service => ({
          ...service,
          features: JSON.parse(service.features || '[]')
        }));
      },
      error: (error) => {
        console.error('Error loading services:', error);
        // Fallback data if API fails
        this.services = [
          {
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies',
            icon: 'web',
            features: ['Responsive Design', 'API Integration', 'Performance Optimization']
          },
          {
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile applications',
            icon: 'phone_android',
            features: ['iOS & Android', 'React Native', 'Flutter']
          },
          {
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and deployment',
            icon: 'cloud',
            features: ['AWS', 'Azure', 'Google Cloud']
          }
        ];
      }
    });
  }

  openServiceDetails(service: any) {
    console.log('Service details:', service);
  }
}
