import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { ActivitiesListComponent } from './activities.component';
import { ActivityComponent } from './activity.component';
import { TimeTrackerRoutesModule } from './time-tracker-routes.module';
import { TimeTrackerComponent }    from './time-tracker.component';
import { TimePipe }                from './time.pipe';
import { DashboardComponent }          from './dashboard.component';

import { ActivityService } from './activity.service';

@NgModule({
  declarations: [
    TimePipe,
    TimeTrackerComponent,
    DashboardComponent,
    ActivitiesListComponent,
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimeTrackerRoutesModule,
  ],
  providers: [
    ActivityService
  ],
})
export class TimeTrackerModule {};
