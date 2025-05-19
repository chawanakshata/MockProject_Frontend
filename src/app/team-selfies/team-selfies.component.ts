import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { API_ENDPOINTS } from '../api-endpoints'; 

@Component({
  selector: 'app-team-selfies',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, FormsModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './team-selfies.component.html',
  styleUrls: ['./team-selfies.component.css']
})

export class TeamSelfiesComponent implements OnInit {
  selfies: any[] = [];
  isLoading = true; // Indicates whether the data is still being loaded
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
  
  teamMemberName: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  currentSlide = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true
    this.http.get<any[]>(API_ENDPOINTS.TEAM_SELFIES)
      .subscribe({
        next: data => {
          this.selfies = data;
          this.isLoading = false; // Set loading state to false
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

// The onFileSelected method is triggered when a file is selected from the file input.
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement; // Lets you access the file input’s properties (like input.files) 
  if (input.files && input.files.length > 0) { // Checks if the input has files and if so, assigns the first file to selectedFile
    this.selectedFile = input.files[0]; 
    this.selectedFileName = this.selectedFile.name; // Gets the name of the selected file
  }
}

addSelfie() {
  if (
    this.selectedFile &&
    this.teamMemberName.trim() &&
    (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/jpg')
  ) {
    const formData = new FormData(); // Creates a new FormData object to hold the file and team member name
    formData.append('File', this.selectedFile);
    formData.append('TeamMemberName', this.teamMemberName.trim());

    this.http.post<any>(API_ENDPOINTS.TEAM_SELFIES_UPLOAD, formData) // Sends a POST request to the API endpoint with the form data
      .subscribe({
        next: (newSelfie) => {  
          this.selfies = [...this.selfies, newSelfie]; // Adds the new selfie to the existing selfies array
          this.teamMemberName = ''; // Resets the team member name input
          this.selectedFile = null; // Resets the selected file
          this.selectedFileName = ''; // Resets the selected file name
          if (this.fileInput && this.fileInput.nativeElement) {  // Resets the file input element
            this.fileInput.nativeElement.value = '';
          }
          this.snackBar.open('Photo added successfully', 'Close', {
            duration: 4000,
            verticalPosition: 'bottom',
            panelClass: 'photo-snackbar'
          });
        },
        error: () => {
          alert('Failed to upload photo. Make sure to enter team member\'s name.');
        }
      });
  } else {
    alert('Please select a JPG/JPEG photo and enter team member\'s name.');
  }
}

  deleteSelfie(id: number) {
    if (confirm('Are you sure you want to delete this selfie?')) {
      this.http.delete(API_ENDPOINTS.TEAM_SELFIES_DELETE(id))
        .subscribe({
          next: () => {
            this.selfies = this.selfies.filter(s => s.id !== id); // Includes only those selfies whose id is not equal to the one you want to delete.
            this.snackBar.open('Photo deleted successfully', 'Close', {
              duration: 4000,
              verticalPosition: 'bottom',
              panelClass: 'photo-snackbar'
            });
          },
          error: () => {
            alert('Failed to delete selfie.');
          }
        });
    }
  }
  
  onCarouselAfterChange(event: any) {
    this.currentSlide = event.currentSlide || 0; // Sets the current slide index based on the event data
  }

  
}