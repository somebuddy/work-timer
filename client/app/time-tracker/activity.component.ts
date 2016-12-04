import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Activity } from './activity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'box-activity',
  template: `
    <div *ngIf="activity" class="activity"
      [class.done]="activity.isDone">
      <span class="title">{{ activity.title }}</span>
      <span class="time">{{ activity.currentTime | time }}</span>
      <button class="btn btn-start"
        *ngIf="!activity.isDone"
        (click)="onStart()">Start</button>
      <button class="btn btn-stop"
        *ngIf="!activity.isDone"
        (click)="onStop()">Stop</button>
      <button class="btn btn-done" (click)="onDone()">Done</button>
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
    if (!this.subscr.closed) {
      this.subscr.unsubscribe();
    }
  }

  public onStart(): void {
    this.activity.start();
    this.timerOn();
  };

  public onStop(activity: Activity): void {
    this.activity.stop();
  };

  public onDone(activity: Activity): void {
    this.activity.done();
  };

  private timerOn() {
    this.subscr = this.timer
      .takeWhile(() => this.activity)
      .subscribe(() => {
        this.ref.markForCheck();
      });
  };
}
