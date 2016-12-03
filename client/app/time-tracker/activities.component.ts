import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
      <span class="time">{{ currentActivity.currentTime | date:"hh:mm:ss" }}</span>
      <button class="btn btn-stop" (click)="onStop(currentActivity)">Stop</button>
      <button class="btn btn-done" (click)="onDone(currentActivity)">Done</button>
    </div>
    <!-- all activities -->
    <div class="activities">
      <header>Previous Activities</header>
      <ul class="content">
        <li *ngFor="let act of activities"
          class="activity"
          [class.selected]="act === currentActivity"
          [class.done]="act.isDone">
          <span class="title">{{ act.title }}</span>
          <span class="time">{{ act.currentTime | date:"hh:mm:ss" }}</span>
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
  private timer: any;
  private timerSub: any;

  constructor(private ref: ChangeDetectorRef) {
  };

  public ngOnInit() {
    this.timer = Observable.interval(500);
    this.timerOn();
  };

  public ngOnDestroy() {
    if (!this.timerSub.closed) {
      this.timerSub.unsubscribe();
    }
  };

  public onStart(activity: Activity): void {
    activity.start();
    this.currentActivity = activity;
    this.timerOn();
  };

  public onStop(activity: Activity): void {
    activity.stop();
    this.currentActivity = null;
  };

  public onDone(activity: Activity): void {
    activity.done();
  };

  private timerOn() {
    this.timerSub = this.timer
      .takeWhile(() => this.currentActivity)
      .subscribe(() => {
        this.ref.markForCheck();
      });
  };
};
