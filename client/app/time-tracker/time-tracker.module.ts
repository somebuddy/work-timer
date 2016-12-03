import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TimeTrackerRoutesModule } from './time-tracker-routes.module';
import { TimeTrackerComponent } from './time-tracker.component';
import { TimerComponent } from './timer.component';
import { ActivitiesListComponent } from './activities.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeTrackerRoutesModule,
  ],
  declarations: [
    TimeTrackerComponent,
    TimerComponent,
    ActivitiesListComponent,
  ],
})
export class TimeTrackerModule {};
