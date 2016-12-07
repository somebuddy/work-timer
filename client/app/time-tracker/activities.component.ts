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
      <header>
        <h3>All Activities</h3>
      </header>
      <div class="new-activity-form">
        <input #activityTitle />
        <button class="btn add"
          (click)="add(activityTitle.value); activityTitle.value=''">
          Add
        </button>
      </div>
      <ul class="content">
        <box-activity *ngFor="let act of activities"
          [activity]="act"
          [class.selected]="act === currentActivity"
          (click)="onSelect(act)">
        </box-activity>
      </ul>
    </div>
  `,
  styles: [`
    box-activity.selected {
      color: orangered;
      font-weight: 600;
    }
  `],
})
export class ActivitiesListComponent {
  public activities: Activity[];
  public currentActivity: Activity;

  constructor(private activityService: ActivityService) {
  };

  public ngOnInit(): void {
    this.getActivities();
  };

  public onSelect(activity: Activity): void {
    if (activity && !activity.isDone) {
      this.currentActivity = activity;
    }
  };

  public add(title: string): void {
    title = title.trim();
    if (title) {
      this.activities.push(new Activity(title));
    }
  };

  private getActivities(): void {
    this.activityService.getActivities().then((activities) => {
      this.activities = activities;
    });
  };

};
