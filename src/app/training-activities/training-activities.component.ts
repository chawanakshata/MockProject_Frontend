import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-activities',
  standalone: true, // <-- Add this if not present
  imports: [CommonModule], // <-- Add this line
  templateUrl: './training-activities.component.html',
  styleUrls: ['./training-activities.component.css']
})

export class TrainingActivitiesComponent implements OnInit {
  activities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7085/api/TrainingActivities')
      .subscribe(data => {
        // Sort by date ascending
        this.activities = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      });
  }
  get activitiesByWeek() {
    const grouped: { [week: number]: any[] } = {};
    for (const activity of this.activities) {
      if (!grouped[activity.week]) grouped[activity.week] = [];
      grouped[activity.week].push(activity);
    }
    return Object.entries(grouped)
      .sort(([a], [b]) => +a - +b); // sort by week number
  }
} 