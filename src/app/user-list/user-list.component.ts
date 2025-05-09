import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import { MatTabsModule } from '@angular/material/tabs'; // <-- Import MatTabsModule
import { FormsModule } from '@angular/forms';

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
    dots: true, // Enable dots to indicate the current slide
    infinite: true, // Enable infinite scrolling
    speed: 300, // Transition speed in milliseconds
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in milliseconds (4 seconds)
    arrows: true, // Show navigation arrows
    pauseOnHover: true, // Pause autoplay when hovering over the carousel
    accessibility: false // Enable accessibility for better user experience
  };
  errorMessage: string = '';

  constructor(private dataService: DataService) {}
  newProfessionalFact: { [userId: number]: string } = {};

  usersArray: any[] = [];
  // ngOnInit(): void {
  //   this.users$ = this.dataService.getUsers(); // Directly use the API response
  // }
  // ngOnInit(): void {
  //   this.users$ = this.dataService.getUsers();
  //   this.users$.subscribe(users => {
  //     this.usersArray = Array.isArray(users) ? users : [users];
  //   });
  // }
  users: any; // Add this line at the top with your other properties

ngOnInit(): void {
  this.users$ = this.dataService.getUsers();
  this.users$.subscribe(users => {
    if (Array.isArray(users)) {
      this.usersArray = users;
      this.users = null;
    } else {
      this.usersArray = [];
      this.users = users;
    }
  });
}

  isArray(value: any): boolean {
    return Array.isArray(value); // Helper method to check if a value is an array
  }

  getPersonalFacts(facts: any[]): any[] {
    return facts?.filter(f => f.type?.toLowerCase() === 'personal') ?? [];
  }
  
  getProfessionalFacts(facts: any[]): any[] {
    return facts?.filter(f => f.type?.toLowerCase() === 'professional') ?? [];
  }


  addProfessionalFact(userId: number) {
    const factText = this.newProfessionalFact[userId]?.trim();
    if (!factText) return;
  
    const payload = {
      fact: factText,
      type: 'Professional',
      userId: userId
    };
  
    this.dataService.addFact(payload).subscribe({
      next: (newFact) => {
        // For multiple users
        const user = this.usersArray.find((u: any) => u.id === userId);
        if (user && user.facts) {
          user.facts.push(newFact);
        }
        // For single user
        if (this.users && this.users.id === userId && this.users.facts) {
          this.users.facts.push(newFact);
        }
        this.newProfessionalFact[userId] = '';
      },
      error: () => {
        alert('Failed to add information.');
      }
    });
  }

  editingFactId: number | null = null;
editFactText: string = '';

startEditFact(fact: any) {
  this.editingFactId = fact.id;
  this.editFactText = fact.fact;
}

cancelEditFact() {
  this.editingFactId = null;
  this.editFactText = '';
}

updateFact(userId: number, fact: any) {
  const updatedFact = this.editFactText.trim();
  if (!updatedFact) return;

  const payload = {
    fact: updatedFact,
    type: fact.type // keep the type as is
  };

  this.dataService.updateFact(fact.id, payload).subscribe({
    next: () => {
      // Update the fact in the local array
      const user = this.usersArray.find((u: any) => u.id === userId);
      if (user && user.facts) {
        const f = user.facts.find((x: any) => x.id === fact.id);
        if (f) f.fact = updatedFact;
      }
      if (this.users && this.users.id === userId && this.users.facts) {
        const f = this.users.facts.find((x: any) => x.id === fact.id);
        if (f) f.fact = updatedFact;
      }
      this.cancelEditFact();
    },
    error: () => {
      alert('Failed to update information.');
    }
  });
}
}