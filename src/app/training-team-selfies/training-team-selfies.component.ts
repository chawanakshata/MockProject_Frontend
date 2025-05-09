import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    pauseOnHover: true,
    accessibility: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7085/api/TrainingSelfies')
      .subscribe(data => {
        this.selfies = data;
      });
  }
}