import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeTrackerRoutesModule } from './time-tracker-routes.module';
import { TimeTrackerComponent } from './time-tracker.component';
import { TimerComponent } from './timer.component';

@NgModule({
  imports: [
    CommonModule,
    TimeTrackerRoutesModule,
  ],
  declarations: [
    TimeTrackerComponent,
    TimerComponent,
  ]
})
export class TimeTrackerModule {};
