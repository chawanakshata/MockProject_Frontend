import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { API_ENDPOINTS } from '../api-endpoints';

@Component({
  selector: 'app-training-team-selfies',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './training-team-selfies.component.html',
  styleUrls: ['./training-team-selfies.component.css']
})

export class TrainingTeamSelfiesComponent implements OnInit {
  selfies: any[] = [];
  carouselConfig = {
    dots: true, // Show dots for each slide
    infinite: true, // Infinite loop mode
    speed: 300, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Autoplay speed in milliseconds
    arrows: true, // Show navigation arrows
    pauseOnHover: true, // Pause autoplay on hover
    accessibility: true  // Enable accessibility features
  };

  constructor(private http: HttpClient) {}

  // This method runs automatically when TrainingTeamSelfies component is created and Fetches selfies from the API
  ngOnInit(): void {
    this.http.get<any[]>(API_ENDPOINTS.TRAINING_TEAM_SELFIES)
      .subscribe(data => {
        this.selfies = data;
      });
  }
}