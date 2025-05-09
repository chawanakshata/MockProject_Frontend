// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { UserListComponent } from './user-list/user-list.component';
// import { TrainingActivitiesComponent } from './training-activities/training-activities.component';
// import { TrainingTeamSelfiesComponent } from './training-team-selfies/training-team-selfies.component';
// import { TeamSelfiesComponent } from './team-selfies/team-selfies.component';


// const routes: Routes = [
//   { path: '', redirectTo: 'user-list', pathMatch: 'full' }, // Redirect root to user-list
//   { path: 'user-list', component: UserListComponent }, // User List route
//   { path: 'training-activities', component: TrainingActivitiesComponent },
//   { path: 'training-team-selfies', component: TrainingTeamSelfiesComponent },
//   { path: 'team-selfies', component: TeamSelfiesComponent },
//   { path: '**', redirectTo: 'user-list' } // Redirect unknown routes to user-list
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)], // Use hash-based routing for better compatibility with older browsers
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}