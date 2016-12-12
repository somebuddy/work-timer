import { Component, Input } from '@angular/core';

import { TimeInterval } from './time-interval.model';

@Component({
  selector: 'time-interval',
  template: `
    <div *ngIf="record">
      <span class="start">{{ record.startedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="end">{{ record.finishedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="time">{{ (record.totalTime) | time }}</span>
      <span> - </span>
      <span class="efficiency">{{ record.efficiency | percent }}</span>
      <label>
        <input type="checkbox" [(ngModel)]="record.isUseful" />
        useful time
      </label>
      <span style="color:red; font-weight: 900"
        *ngIf="record.isDeleted">
        (deleted:
          <button style="color: red"
            (click)="restoreRecord()">restore</button>
        )
      </span>
      <button class="btn delete"
        *ngIf="!record.isDeleted"
        (click)="deleteRecord()">
        Delete
      </button>
    </div>
  `,
  styles: [`
  `],
})
export class TimeIntervalComponent {
  @Input()
  public record: TimeInterval;

  public deleteRecord() {
    this.record.delete();
  };

  public restoreRecord() {
    this.record.restore();
  }
};
