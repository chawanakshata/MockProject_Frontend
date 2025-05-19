import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { API_ENDPOINTS } from '../api-endpoints';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, MatTabsModule, FormsModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<any>; // Observable of the API response
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
  errorMessage: string = '';

  private apiUrl = API_ENDPOINTS.USERS; 

  newProfessionalFact: { [userId: number]: string } = {};
  usersArray: any[] = [];  
  users: any; 

  editingFactId: number | null = null;
  editFactText: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // Fetches users from the API and handles the response
  // If the response is an array, it assigns it to usersArray and sets users to null
  getUsers() {
    this.isLoading = true;
    this.users$ = this.http.get<any[]>(`${this.apiUrl}`);
    this.users$.subscribe({
  next: users => {
    if (Array.isArray(users)) {
      this.usersArray = users;
      this.users = null;
    }
    this.isLoading = false;
  },
  error: () => {
    this.errorMessage = 'Failed to fetch users.';
    this.isLoading = false;
  }
  });
}

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  //Filters the user's information and returns only that information where the type is 'personal'
  getPersonalFacts(facts: any[]): any[] {
    return facts?.filter(f => f.type?.toLowerCase() === 'personal') ?? [];
  }
  
  //Filters the user's information and returns only that information where the type is 'professional'
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
        if (user && user.facts) {   // If the user and their facts array exist, it adds the new fact to that array.
          user.facts.push(newFact);
        }
        
        this.newProfessionalFact[userId] = '';

        this.snackBar.open('Information added successfully', 'Close', {
              duration: 4000,
              verticalPosition: 'bottom',
              panelClass: 'photo-snackbar'
            });
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
        this.cancelEditFact();

        this.snackBar.open('Information updated successfully', 'Close', {
              duration: 4000,
              verticalPosition: 'bottom',
              panelClass: 'photo-snackbar'
            });
      },
      error: () => {
        alert('Failed to update information.');
      }
    });
  }

  deleteFact(userId: number, factId: number) {
  if (confirm('Are you sure you want to delete this Information?')) {
    this.http.delete(API_ENDPOINTS.USER_FACTS_DELETE(factId)).subscribe({
      next: () => {
        // Remove the fact from the local array for the correct user
        const user = this.usersArray.find((u: any) => u.id === userId);
        if (user && user.facts) {
          user.facts = user.facts.filter((f: any) => f.id !== factId);
        }
        this.snackBar.open('Information deleted successfully', 'Close', {
              duration: 4000,
              verticalPosition: 'bottom',
              panelClass: 'photo-snackbar'
            });
      },
      error: () => {
        alert('Failed to delete fact.');
      }
    });
  }
}
}


