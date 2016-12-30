import { Component, Input } from '@angular/core';

import { TimeInterval } from './time-interval.model';

@Component({
  selector: 'time-interval',
  template:`
    <div class="time-slot"
      *ngIf="slot"
      [class.deleted]="slot.isDeleted"
      [class.useful]="slot.isUseful">
      <div class="useful-checker" [class.checked]="slot.isUseful"></div>
      <div class="period"></div>
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
      <label>
        <input type="checkbox" [(ngModel)]="record.isUseful" />
        useful time
      </label>
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
};
