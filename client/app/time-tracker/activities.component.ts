import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Activity } from './activity.model';

const ACTIVITIES: Activity[] = [
  new Activity('Create Activity component'),
  new Activity('Test Activity component'),
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'box-activities',
  template: `
    <!-- current activity -->
    <div class="activity" *ngIf="currentActivity">
      <span>Now working on:</span>
      <span class="title">{{ currentActivity.title }}</span>
      <span class="time">{{ currentActivity.currentTime }}</span>
      <button class="btn btn-stop" (click)="onStop(currentActivity)">Stop</button>
      <button class="btn btn-done" (click)="onDone(currentActivity)">Done</button>
    </div>
    <!-- all activities -->
    <div class="activities">
      <header>Previous Activities</header>
      <ul class="content">
        <li *ngFor="let act of activities"
          class="activity"
          [class.selected]="act === selectedActivity"
          [class.done]="act.isDone"
          (click)="onSelect(act)">
          <span class="title">{{ act.title }}</span>
          <span class="time">{{ act.currentTime }}</span>
          <button class="btn btn-start"
            *ngIf="!act.isDone"
            (click)="onStart(act)">Start</button>
          <button class="btn btn-done" (click)="onDone(act)">Done</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .activity {
      padding: 1rem 2rem;
      margin: 1rem 0;
      border-top: 1px solid #AAA;
      border-bottom: 1px solid #AAA;
    }

    .activity > .title {
      display: inline-block;
      margin-right: auto;
    }

    .activity > .time {
      display: inline-block;
      margin-right: 1rem;
      font-weight: 600;
    }

    .activity.selected {
      color: orangered;
      font-weight: 600;
    }

    .activity.done > .title {
      text-decoration: line-through;
    }
  `]
})
export class ActivitiesListComponent {
  public activities = ACTIVITIES;
  public currentActivity: Activity;
  public selectedActivity: Activity;

  public onSelect(activity: Activity): void {
    this.selectedActivity = activity;
  };

  public onStart(activity: Activity): void {
    activity.start();
    this.currentActivity = activity;
  };

  public onStop(activity: Activity): void {
    activity.stop();
    this.currentActivity = null;
  };

  public onDone(activity: Activity): void {
    activity.done();
  };
};
