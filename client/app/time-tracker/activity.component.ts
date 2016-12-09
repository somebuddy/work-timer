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
      <span class="time current">{{ activity.currentTime | time }}</span>
      <span class="time total">{{ activity.totalTime | time }}</span>

      <button class="btn btn-start"
        *ngIf="!activity.isDone && !activity.isActive"
        (click)="onStart()">Start</button>
      <button class="btn btn-start"
        *ngIf="!activity.isDone && activity.isActive"
        (click)="onPause()">Pause</button>
      <button class="btn btn-start"
        *ngIf="!activity.isDone && activity.isActive"
        (click)="onResume()">Resume</button>
      <button class="btn btn-stop"
        *ngIf="!activity.isDone && activity.isActive"
        (click)="onStop()">Stop</button>

      <button class="btn btn-done" (click)="onDone()">Done</button>
      <ul class="history" *ngIf="activity.historyRecords">
        <li *ngFor="let rec of activity.historyRecords">
          <span class="start">{{ rec.startedAt | date:'medium'}}</span>
          <span> - </span>
          <span class="end">{{ rec.finishedAt | date:'medium'}}</span>
          <span> - </span>
          <span class="time">{{ (rec.totalTime) | time }}</span>
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

  public onResume(): void {
    this.activity.start();
  };

  public onStop(activity: Activity): void {
    this.activity.stop();
    this.timerOff();
  };

  public onDone(activity: Activity): void {
    this.activity.done();
    this.timerOff();
  };

  private timerOn() {
    this.subscr = this.timer
      .takeWhile(() => this.activity)
      .subscribe(() => {
        this.ref.markForCheck();
      });
  };

  private timerOff() {
    if (!this.subscr.closed) {
      this.subscr.unsubscribe();
    }
  };
}
