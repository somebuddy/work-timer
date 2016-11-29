import { Component } from '@angular/core';
import { Timer } from './timer.component';

const ACTIVITIES: Timer[] = [
  { activity: 'Create Timer component', currentTime: 500 },
  { activity: 'Test Timer component', currentTime: 700 },
]

@Component({
  selector: 'box-activities',
  template: `
    <!-- current activity -->
    <div class="activity" *ngIf="currentActivity">
      <span>Now working on:</span>
      <span class="title">{{ currentActivity.activity }}</span>
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
          [class.done]="act.done"
          (click)="onSelect(act)">
          <span class="title">{{ act.activity }}</span>
          <span class="time">{{ act.currentTime }}</span>
          <button class="btn btn-start"
            *ngIf="!act.done"
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
  activities = ACTIVITIES;
  currentActivity: Timer;
  selectedActivity: Timer;

  onSelect(activity: Timer):void {
    this.selectedActivity = activity;
  };

  onStart(activity: Timer): void {
    this.currentActivity = activity;
    activity.startedAt = new Date();
  };

  onStop(activity: Timer): void {
    activity.stoppedAt = new Date();
    activity.currentTime = (activity.currentTime || 0) + (activity.stoppedAt - activity.startedAt);
    this.currentActivity = undefined;
  };

  onDone(activity: Timer): void {
    activity.done = true;
    activity.doneAt = new Date();
    console.log('Finished: ', activity);
  };
};
