import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { TimeIntervalComponent } from './time-interval/time-interval.component';

import { ActivityComponent } from './activity/activity.component';
import { ActivityService } from './activity/activity.service';
import { ActivityRecordFormComponent } from './activity/activity-record-form.component';

import { TimePipe }                from './shared/time.pipe';

import { ActivitiesListComponent } from './activity-list/activities.component';
import { DashboardComponent }          from './dashboard/dashboard.component';

import { TimeTrackerRoutesModule } from './time-tracker-routes.module';
import { TimeTrackerComponent }    from './time-tracker.component';


@NgModule({
  declarations: [
    TimePipe,
    TimeTrackerComponent,
    DashboardComponent,
    ActivitiesListComponent,
    ActivityComponent,
    TimeIntervalComponent,
    ActivityRecordFormComponent,
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
