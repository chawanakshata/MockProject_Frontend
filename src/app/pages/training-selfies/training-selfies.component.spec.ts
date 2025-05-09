import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSelfiesComponent } from './training-selfies.component';

describe('TrainingSelfiesComponent', () => {
  let component: TrainingSelfiesComponent;
  let fixture: ComponentFixture<TrainingSelfiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSelfiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSelfiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
