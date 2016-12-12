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
    </div>
  `,
  styles: [`
  `],
})
export class ActivitySessionComponent {
  @Input()
  public record: ActivityRecord;
};
