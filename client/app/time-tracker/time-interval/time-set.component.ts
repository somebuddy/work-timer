import { Component, Input } from '@angular/core';

import { TimeSet } from './time-set.model';

@Component({
  selector: 'time-set',
  template: `
    <div class="time-set" *ngIf="set">
      <div class="comment">
        <header>comment</header>
        <div class="value">{{ set.comment }}</div>
      </div>
      <div class="start-time" *ngIf="set.startedAt">
        <header>started at:</header>
        <div class="value">{{ set.startedAt | date:'medium'}}</div>
      </div>
      <div class="summary" *ngIf="set.startedAt">
        <header>total</header>
        <div class="value main">{{ set.usefulTime | time }}</div>
        <div class="value secondary">{{ set.efficiency | percent }}</div>
      </div>
      <div class="now" *ngIf="set.startedAt">
        <header>now</header>
        <div class="value main"></div>
        <div class="value secondary"></div>
      </div>
    </div>
  `
})
export class TimeSetComponent {
  @Input()
  public set: TimeSet;
};
