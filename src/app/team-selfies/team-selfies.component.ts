import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { API_ENDPOINTS } from '../api-endpoints'; 

@Component({
  selector: 'app-team-selfies',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, FormsModule, MatSnackBarModule],
  templateUrl: './team-selfies.component.html',
  styleUrls: ['./team-selfies.component.css']
})

export class TeamSelfiesComponent implements OnInit {
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
    accessibility: true
  };
  
  teamMemberName: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.http.get<any[]>(API_ENDPOINTS.TEAM_SELFIES)
      .subscribe(data => {
        this.selfies = data;
      });
  }

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.selectedFileName = this.selectedFile.name;
  }
}

  addSelfie() {
    if (this.selectedFile && this.teamMemberName.trim()) {
      const formData = new FormData();
      formData.append('File', this.selectedFile);
      formData.append('TeamMemberName', this.teamMemberName.trim());
      this.http.post<any>(API_ENDPOINTS.TEAM_SELFIES_UPLOAD, formData)
        .subscribe({
          next: (newSelfie) => {
            this.selfies = [...this.selfies, newSelfie];
            this.teamMemberName = '';
            this.selectedFile = null;
            this.selectedFileName = '';
            if (this.fileInput && this.fileInput.nativeElement) {
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
      alert('Please select a photo and enter team member\'s name.');
    }
  }

  deleteSelfie(id: number) {
    if (confirm('Are you sure you want to delete this selfie?')) {
      this.http.delete(API_ENDPOINTS.TEAM_SELFIES_DELETE(id))
        .subscribe({
          next: () => {
            this.selfies = this.selfies.filter(s => s.id !== id);
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
  
  currentSlide = 0;
  onCarouselAfterChange(event: any) {
    this.currentSlide = event.currentSlide || 0;
  }

  
}