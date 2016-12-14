import { Component } from '@angular/core';

import { Activity } from '../activity/activity.model';
import { ActivityService } from '../activity/activity.service';

@Component({
  selector: 'box-activities-dashboard',
  template: `
    <div class="activities dashboard">
      <header>
        <div class="title">
          <h3>Current activities</h3>
        </div>
      </header>
      <div class="activity new">
        <input #activityTitle placeholder="What are you doing now?">
        <button class="btn start"
          (click)="add(activityTitle.value); activityTitle.value=''">Start Tracking</button>
      </div>

      <div *ngFor="let act of activities">
        <box-activity [activity]="act"
          *ngIf="act.isActive"></box-activity>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1.5rem 1rem;
      background: #FEFEEE;
    }
  `]
})
export class DashboardComponent {
  public activities: Activity[];

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

  public add(title: string): void {
    title = title.trim();
    if (title) {
      let activity = new Activity(title);
      this.activities.push(activity);
      activity.start();
    }
  };
};
