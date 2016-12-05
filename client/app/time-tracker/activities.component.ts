import { Component } from '@angular/core';

import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

@Component({
  providers: [ActivityService],
  selector: 'box-activities',
  template: `
    <!-- current activity -->
    <h4>Now working on:</h4>
    <box-activity [activity]="currentActivity"></box-activity>
    <!-- all activities -->
    <div class="activities">
      <header>Previous Activities</header>
      <ul class="content">
        <box-activity *ngFor="let act of activities"
          [activity]="act"
          [class.selected]="act === currentActivity">
        </box-activity>
      </ul>
    </div>
  `,
})
export class ActivitiesListComponent {
  public activities: Activity[];
  public currentActivity: Activity;

  constructor(private activityService: ActivityService) {
  };

  public ngOnInit(): void {
    this.getActivities();
  };

  private getActivities(): void {
    this.activityService.getActivities().then((activities) => {
      this.activities = activities;
    });
  };
};
