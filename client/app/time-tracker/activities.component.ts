import { Component } from '@angular/core';

import { Activity } from './activity.model';

const ACTIVITIES: Activity[] = [
  new Activity('Create Activity component'),
  new Activity('Test Activity component'),
];

@Component({
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
  public activities = ACTIVITIES;
  public currentActivity: Activity;
};
