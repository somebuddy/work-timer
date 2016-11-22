import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeTrackerComponent } from './time-tracker.component';

const timeTrackerRoutes: Routes = [
  { path: 'timer', component: TimeTrackerComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(timeTrackerRoutes)
  ]
})
export class TimeTrackerRoutesModule {};
