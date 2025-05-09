import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSelfiesComponent } from './team-selfies.component';

describe('TeamSelfiesComponent', () => {
  let component: TeamSelfiesComponent;
  let fixture: ComponentFixture<TeamSelfiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSelfiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSelfiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
