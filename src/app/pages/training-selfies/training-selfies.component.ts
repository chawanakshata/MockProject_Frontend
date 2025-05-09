// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-training-selfies',
//   imports: [],
//   templateUrl: './training-selfies.component.html',
//   styleUrl: './training-selfies.component.css'
// })
// export class TrainingSelfiesComponent {

// }

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-training-selfies',
  templateUrl: './training-selfies.component.html',
  styleUrls: ['./training-selfies.component.css']
})
export class TrainingSelfiesComponent implements OnInit {
  trainingSelfies: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTrainingSelfies().subscribe(
      (data) => {
        this.trainingSelfies = data;
      },
      (error) => {
        console.error('Error fetching training selfies data', error);
      }
    );
  }
}


