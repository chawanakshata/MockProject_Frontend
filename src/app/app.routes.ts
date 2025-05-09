
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { TrainingActivitiesComponent } from './training-activities/training-activities.component';
import { TrainingTeamSelfiesComponent } from './training-team-selfies/training-team-selfies.component';
import { TeamSelfiesComponent } from './team-selfies/team-selfies.component';

export const routes: Routes = [
  //{ path: 'user-list', component: UserListComponent },
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent },
  { path: 'training-activities', component: TrainingActivitiesComponent },
  { path: 'training-team-selfies', component: TrainingTeamSelfiesComponent },
  { path: 'team-selfies', component: TeamSelfiesComponent },
  { path: '**', redirectTo: 'user-list' },
  // Add valid route definitions here or remove this placeholder
];
