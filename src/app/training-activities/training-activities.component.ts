import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { API_ENDPOINTS } from '../api-endpoints';

@Component({
  selector: 'app-training-activities',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './training-activities.component.html',
  styleUrls: ['./training-activities.component.css']
})

export class TrainingActivitiesComponent implements OnInit {
  activities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(API_ENDPOINTS.TRAINING_ACTIVITIES)
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
      // grouped = {
      //   1: [ {week:1, activity-date:"2025-02-17 ", activity-day: 1, activity-desc: " "}, {week:1, activity-date:"2025-02-18 ", activity-day: 2, activity-desc: " "} ],
      //   2: [ {week:2, activity-date:"2025-02-24 ", activity-day: 6, activity-desc: " "}, {week:2, activity-date:"2025-02-25 ", activity-day: 7, activity-desc: " "} ]
      // }
    return Object.entries(grouped)
      .sort(([a], [b]) => +a - +b); // sort by week number

      // [1, [ {week:1, activity-date:"2025-02-17 ", activity-day: 1, activity-desc: " "}, {week:1, activity-date:"2025-02-18 ", activity-day: 2, activity-desc: " "} ]],
      // [2, [ {week:2, activity-date:"2025-02-24 ", activity-day: 6, activity-desc: " "}, {week:2, activity-date:"2025-02-25 ", activity-day: 7, activity-desc: " "} ]]
  }
} 