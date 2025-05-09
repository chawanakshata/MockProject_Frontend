import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingActivitiesComponent } from './training-activities.component';

describe('TrainingActivitiesComponent', () => {
  let component: TrainingActivitiesComponent;
  let fixture: ComponentFixture<TrainingActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
