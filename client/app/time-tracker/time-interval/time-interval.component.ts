import { Component, Input } from '@angular/core';

import { TimeInterval } from './time-interval.model';

@Component({
  selector: 'time-interval',
  template:`
    <div class="time-slot"
      *ngIf="slot && slot.startedAt"
      [class.deleted]="slot.isDeleted"
      [class.useful]="slot.isUseful">
      <div class="useful-checker"
        [class.checked]="slot.isUseful"
        (click)="slot.isUseful = !slot.isUseful"></div>
      <div class="period">
        <div class="dates">
          <div class="start">{{ slot.startedAt | date:'mediumDate' }}</div>
          <div class="finish"
            *ngIf="isFinishDateDisplayed()">{{ slot.finishedAt | date:'mediumDate' }}</div>
        </div>
        <div class="times">
          <div class="start">{{ slot.startedAt | date:'mediumTime' }}</div>
          <div class="finish"
            *ngIf="slot.finishedAt">{{ slot.finishedAt | date:'mediumTime' }}</div>
          <div class="btn stop"
            *ngIf="!slot.finishedAt"
            (click)="slot.stop()">Stop</div>
        </div>
      </div>
      <div class="comment">{{ slot.comment }}</div>
      <div class="timer">{{ slot.usefulTime | time }}</div>
      <div class="actions">
        <button class="btn delete" *ngIf="!slot.isDeleted" (click)="slot.delete()">delete</button>
        <button class="btn restore" *ngIf="slot.isDeleted" (click)="slot.restore()">restore</button>
      </div>
    </div>
  `,
  styles: [`
    .time-slot {
      display: flex;
    }
  `],
})
export class TimeIntervalComponent {
  @Input()
  public slot: TimeInterval;

  isFinishDateDisplayed(): boolean {
    if (this.slot && this.slot.finishedAt) {
      let f = this.slot.finishedAt;
      let s = this.slot.startedAt;
      return !(f.getFullYear() === s.getFullYear() &&
        f.getMonth() === s.getMonth() &&
        f.getDate() === s.getDate());
    }
    return false;
  }
};
