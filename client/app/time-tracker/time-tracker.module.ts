import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { ActivitiesListComponent } from './activities.component';
import { TimeTrackerRoutesModule } from './time-tracker-routes.module';
import { TimeTrackerComponent }    from './time-tracker.component';
import { TimePipe }                from './time.pipe';
import { TimerComponent }          from './timer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeTrackerRoutesModule,
  ],
  declarations: [
    TimePipe,
    TimeTrackerComponent,
    TimerComponent,
    ActivitiesListComponent,
  ],
})
export class TimeTrackerModule {};
