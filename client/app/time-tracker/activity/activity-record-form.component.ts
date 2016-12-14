import { Component, EventEmitter, Output } from '@angular/core';

import { ActivityRecord } from './activity.model';

@Component({
  selector: 'activity-record-form',
  template: `
    <form (ngSubmit)="onSubmit()" #newRecordForm="ngForm">
      <div>
        <label>Started at:</label>
        <input type="datetime-local" [(ngModel)]="newRecord.startedAt" name="start"/>
        {{ startedAt }}
      </div>
      <div>
        <label>Finished at:</label>
        <input type="datetime-local" [(ngModel)]="newRecord.finishedAt" name="finish"/>
      </div>
      <div>
        <label>Comment:</label>
        <input type="text" [(ngModel)]="newRecord.comment" name="comment"/>
      </div>

      <label>
        <input type="checkbox" [(ngModel)]="newRecord.isUseful" name="isUserful"/>
        Useful activity
      </label>
      <br>
      <button type="submit">Save</button>
    </form>
  `
})
export class ActivityRecordFormComponent {
  @Output()
  onCreated = new EventEmitter<ActivityRecord>();

  public newRecord: ActivityRecord = new ActivityRecord();


  public onSubmit() {
    this.newRecord.startedAt = new Date(this.newRecord.startedAt);
    this.newRecord.finishedAt = new Date(this.newRecord.finishedAt);
    this.onCreated.emit(this.newRecord);
    this.newRecord = new ActivityRecord();
  };
};
