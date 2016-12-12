import { Component, Input } from '@angular/core';

import { ActivityRecord } from './activity.model';

@Component({
  selector: 'activity-session',
  template: `
    <div *ngIf="record">
      <span class="start">{{ record.startedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="end">{{ record.finishedAt | date:'medium'}}</span>
      <span> - </span>
      <span class="time">{{ (record.totalTime) | time }}</span>
      <span> - </span>
      <span class="efficiency">{{ record.efficiency | percent }}</span>
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
export class ActivitySessionComponent {
  @Input()
  public record: ActivityRecord;

  public deleteRecord() {
    this.record.delete();
  };

  public restoreRecord() {
    this.record.restore();
  }
};
