import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { API_ENDPOINTS } from '../api-endpoints';

@Component({
  selector: 'app-training-team-selfies',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, MatProgressSpinnerModule],
  templateUrl: './training-team-selfies.component.html',
  styleUrls: ['./training-team-selfies.component.css']
})
export class TrainingTeamSelfiesComponent implements OnInit {
  selfies: any[] = [];
  isLoading = true;
  carouselConfig = { 
    dots: true, // Enables dots for navigation
    infinite: true, // Enables infinite scrolling
    speed: 300, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3000, // Autoplay speed in milliseconds
    arrows: true, // Enables navigation arrows
    pauseOnHover: true, // Pauses autoplay on hover
    accessibility: true // Enables accessibility features
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get<any[]>(API_ENDPOINTS.TRAINING_TEAM_SELFIES) // Make an HTTP GET request to fetch selfies
      .subscribe({ // Subscribe to the HTTP request
        next: data => {  // Handle successful response
          this.selfies = data; // Assign the response data to selfies
          this.isLoading = false; // Set loading state to false
        },
        error: err => {
          this.isLoading = false; 
        }
      });
  }
}

