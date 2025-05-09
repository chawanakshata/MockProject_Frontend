import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTeamSelfiesComponent } from './training-team-selfies.component';

describe('TrainingTeamSelfiesComponent', () => {
  let component: TrainingTeamSelfiesComponent;
  let fixture: ComponentFixture<TrainingTeamSelfiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTeamSelfiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTeamSelfiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
