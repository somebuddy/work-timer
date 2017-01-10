import { Component, Input } from '@angular/core';

import { TimeSet } from './time-set.model';

@Component({
  selector: 'time-set',
  template: `
    <div class="time-set" *ngIf="set">
    </div>
  `
})
export class TimeSetComponent {
  @Input()
  public set: TimeSet;
};
