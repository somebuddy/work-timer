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
          <div class="start"></div>
          <div class="finish"></div>
        </div>
      </div>
      <div class="comment"></div>
      <div class="timer"></div>
      <div class="actions">
        <button class="btn delete" *ngIf="!slot.isDeleted" (click)="slot.delete()">delete</button>
        <button class="btn restore" *ngIf="slot.isDeleted" (click)="slot.restore()">restore</button>
      </div>
      <!--
      <span class="start">{{ record.startedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="end">{{ record.finishedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="time">{{ (record.totalTime) | time }}</span>
      <span> - </span>
      <span class="comment">
        <input type="text" [(ngModel)]="record.comment">
      </span>
      <span> - </span>
      <span class="efficiency">{{ record.efficiency | percent }}</span>
      -->
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
