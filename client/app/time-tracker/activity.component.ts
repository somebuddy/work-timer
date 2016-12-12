import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Activity } from './activity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'box-activity',
  template: `
    <div *ngIf="activity" class="activity"
      [class.done]="activity.isDone">
      <span class="title">{{ activity.title }}</span>
      <span class="time current">
        {{ activity.currentTime | time }}
        <a *ngIf="activity.isActive"
          (click)="toggleCurrentDetails()">
          ({{ activity.currentIntervals.length }} intervals)
        </a>
      </span>
      <span class="time total">{{ activity.totalTime | time }}</span>

      <button class="btn btn-start"
        *ngIf="!activity.isDone && !activity.isRunning"
        (click)="onStart()">Start</button>
      <button class="btn btn-start"
        *ngIf="!activity.isDone && activity.isRunning"
        (click)="onPause()">Pause</button>
      <button class="btn btn-stop"
        *ngIf="!activity.isDone && activity.isActive"
        (click)="onStop()">Stop</button>

      <button class="btn btn-done" (click)="onDone()">Done</button>

      <button class="btn btn-show-history"
        *ngIf="activity.historyRecords.length && !historyDisplayed"
        (click)="toggleHistory()">Show history</button>

      <button class="btn btn-hide-history"
        *ngIf="activity.historyRecords.length && historyDisplayed"
        (click)="toggleHistory()">Hide history</button>

      <div class="history" *ngIf="activity.historyRecords && historyDisplayed">
        <header>Previous records</header>
        <time-interval *ngFor="let record of activity.historyRecords" [record]="record"></time-interval>
      </div>

      <div class="history" *ngIf="activity.currentIntervals && currentDetailsVisible">
        <header>Current Intervals</header>
        <time-interval *ngFor="let record of activity.currentIntervals" [record]="record"></time-interval>
      </div>
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

    .activity > .time.current {
      font-size: 1.5rem;
    }

    .activity.done > .title {
      text-decoration: line-through;
    }

    .history {
      font-size: .75em;
      opacity: 0.6;
      font-weight: 400;
    }
  `]
})
export class ActivityComponent {
  @Input()
  public activity: Activity;

  public historyDisplayed: boolean = false;
  public currentDetailsVisible: boolean = false;

  private timer: any;
  private subscr: any;

  constructor(private ref: ChangeDetectorRef) {
  };

  public ngOnInit() {
    this.timer = Observable.interval(100);
    this.timerOn();
  };

  public ngOnDestroy() {
    this.timerOff();
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.timer && changes['activity'].currentValue) {
      this.timerOn();
    }
  }

  public onStart(): void {
    this.activity.start();
    this.timerOn();
  };

  public onPause(): void {
    this.activity.pause();
  };

  public onStop(activity: Activity): void {
    this.activity.stop();
    this.timerOff();
  };

  public onDone(activity: Activity): void {
    this.activity.done();
    this.timerOff();
  };

  public toggleHistory() {
    this.historyDisplayed = !this.historyDisplayed;
  };

  public toggleCurrentDetails() {
    this.currentDetailsVisible = !this.currentDetailsVisible;
  }

  private timerOn() {
    if (!this.subscr || this.subscr.closed) {
      this.subscr = this.timer
      .takeWhile(() => this.activity)
      .subscribe(() => {
        this.ref.markForCheck();
      });
    }
  };

  private timerOff() {
    if (!this.subscr.closed) {
      this.subscr.unsubscribe();
    }
  };
}
