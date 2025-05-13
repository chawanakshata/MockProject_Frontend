import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { FormsModule } from '@angular/forms';
import { API_ENDPOINTS } from '../api-endpoints';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, MatTabsModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<any>; // Observable of the API response
  carouselConfig = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    accessibility: true
  };
  errorMessage: string = '';

  private apiUrl = API_ENDPOINTS.USERS; // API endpoint for users

  newProfessionalFact: { [userId: number]: string } = {};
  usersArray: any[] = [];  
  users: any; 

  editingFactId: number | null = null;
  editFactText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.http.get<any[]>(`${this.apiUrl}`);
    this.users$.subscribe(users => {
      if (Array.isArray(users)) {
        this.usersArray = users;
        this.users = null;
      } 
    }, error => {
      this.errorMessage = 'Failed to fetch users.';
    });
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  //Filters the user's facts and returns only those where the type is 'personal'
  getPersonalFacts(facts: any[]): any[] {
    return facts?.filter(f => f.type?.toLowerCase() === 'personal') ?? [];
  }
  
  //Filters the user's facts and returns only those where the type is 'professional'
  getProfessionalFacts(facts: any[]): any[] {
    return facts?.filter(f => f.type?.toLowerCase() === 'professional') ?? [];
  }

  // Adds a new professional fact for the user
  addProfessionalFact(userId: number) {
    const factText = this.newProfessionalFact[userId]?.trim();
    if (!factText) return; //If the input is empty, the function stops and does nothing.
  
    //Prepares the data to send to the backend: the fact text, its type, and the user’s ID.
    const payload = {
      fact: factText,
      type: 'Professional',
      userId: userId
    };
  
    this.http.post<any>(API_ENDPOINTS.USER_FACTS, payload).subscribe({
      next: (newFact) => {  //Finds the user in the users array and adds the new fact to their facts list.
        const user = this.usersArray.find((u: any) => u.id === userId);
        if (user && user.facts) {
          user.facts.push(newFact);
        }
        
        this.newProfessionalFact[userId] = '';
      },
      error: () => {
        alert('Failed to add information.');
      }
    });
  }

  //Starts editing a fact by setting the editing fact ID and the edit text.
  startEditFact(fact: any) {
    this.editingFactId = fact.id;
    this.editFactText = fact.fact;
  }

  //Cancels editing by clearing the editing fact ID and the edit text.
  cancelEditFact() {
    this.editingFactId = null;
    this.editFactText = '';
  }

 //Updates a fact both on the backend and in your local data, so the UI stays in sync with the server
  updateFact(userId: number, fact: any) {
    const updatedFact = this.editFactText.trim();
    if (!updatedFact) return;

    const payload = {
      fact: updatedFact,
      type: fact.type 
    };

    this.http.put(API_ENDPOINTS.USER_FACTS_UPDATE(fact.id), payload).subscribe({
      next: () => {
        // Finds the user in the users array and updates the fact text in the local data, so the UI shows the new value.
        const user = this.usersArray.find((u: any) => u.id === userId);
        if (user && user.facts) {
          const f = user.facts.find((x: any) => x.id === fact.id);
          if (f) f.fact = updatedFact;
        }
        // if (this.users && this.users.id === userId && this.users.facts) {
        //   const f = this.users.facts.find((x: any) => x.id === fact.id);
        //   if (f) f.fact = updatedFact;
        // }
        this.cancelEditFact();
      },
      error: () => {
        alert('Failed to update information.');
      }
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../services/data.service';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { SlickCarouselModule } from 'ngx-slick-carousel'; 
// import { MatTabsModule } from '@angular/material/tabs'; 
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [CommonModule, SlickCarouselModule, MatTabsModule, FormsModule],
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {
//   users$!: Observable<any>; // Observable of the API response
//   carouselConfig = {
//     dots: true, // Enable dots to indicate the current slide
//     infinite: true, // Enable infinite scrolling
//     speed: 300, // Transition speed in milliseconds
//     slidesToShow: 1, // Show one image at a time
//     slidesToScroll: 1, // Scroll one image at a time
//     autoplay: true, // Enable autoplay
//     autoplaySpeed: 3000, // Autoplay interval in milliseconds (3 seconds)
//     arrows: true, // Show navigation arrows
//     pauseOnHover: true, // Pause autoplay when hovering over the carousel
//     accessibility: true // Enable accessibility for better user experience
//   };
//   errorMessage: string = '';

//   constructor(private dataService: DataService) {}
//   newProfessionalFact: { [userId: number]: string } = {};

//   usersArray: any[] = [];  
//   users: any; 

// ngOnInit(): void {
//   this.users$ = this.dataService.getUsers();
//   this.users$.subscribe(users => {
//     if (Array.isArray(users)) {
//       this.usersArray = users;
//       this.users = null;
//     } else {
//       this.usersArray = [];
//       this.users = users;
//     }
//   });
// }

//   isArray(value: any): boolean {
//     return Array.isArray(value); // Helper method to check if a value is an array
//   }

//   //Filters the user's facts and returns only those where the type is 'personal'
//   getPersonalFacts(facts: any[]): any[] {
//     return facts?.filter(f => f.type?.toLowerCase() === 'personal') ?? [];
//   }
  
//   getProfessionalFacts(facts: any[]): any[] {
//     return facts?.filter(f => f.type?.toLowerCase() === 'professional') ?? [];
//   }


//   addProfessionalFact(userId: number) {
//     const factText = this.newProfessionalFact[userId]?.trim();
//     if (!factText) return;
  
//     const payload = {
//       fact: factText,
//       type: 'Professional',
//       userId: userId
//     };
  
//     this.dataService.addFact(payload).subscribe({
//       next: (newFact) => {
//         // For multiple users
//         const user = this.usersArray.find((u: any) => u.id === userId);
//         if (user && user.facts) {
//           user.facts.push(newFact);
//         }
//         // For single user
//         if (this.users && this.users.id === userId && this.users.facts) {
//           this.users.facts.push(newFact);
//         }
//         this.newProfessionalFact[userId] = '';
//       },
//       error: () => {
//         alert('Failed to add information.');
//       }
//     });
//   }

//   editingFactId: number | null = null;
// editFactText: string = '';

// startEditFact(fact: any) {
//   this.editingFactId = fact.id;
//   this.editFactText = fact.fact;
// }

// cancelEditFact() {
//   this.editingFactId = null;
//   this.editFactText = '';
// }

// updateFact(userId: number, fact: any) {
//   const updatedFact = this.editFactText.trim();
//   if (!updatedFact) return;

//   const payload = {
//     fact: updatedFact,
//     type: fact.type // keep the type as is
//   };

//   this.dataService.updateFact(fact.id, payload).subscribe({
//     next: () => {
//       // Update the fact in the local array
//       const user = this.usersArray.find((u: any) => u.id === userId);
//       if (user && user.facts) {
//         const f = user.facts.find((x: any) => x.id === fact.id);
//         if (f) f.fact = updatedFact;
//       }
//       if (this.users && this.users.id === userId && this.users.facts) {
//         const f = this.users.facts.find((x: any) => x.id === fact.id);
//         if (f) f.fact = updatedFact;
//       }
//       this.cancelEditFact();
//     },
//     error: () => {
//       alert('Failed to update information.');
//     }
//   });
// }
// }