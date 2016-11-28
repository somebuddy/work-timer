import { Component } from '@angular/core';
import { Timer } from './timer.component';

const ACTIVITIES: Timer[] = [
  { activity: 'Create Timer component', currentTime: 500 },
  { activity: 'Test Timer component', currentTime: 700 },
]

@Component({
  selector: 'box-activities',
  template: `
    <div class="activities">
      <header>Previous Activities</header>
      <ul class="content">
        <li *ngFor="let act of activities">
          <div class="title">{{ act.activity }}</div>
          <div class="time">{{ act.currentTime }}</div>
        </li>
      </ul>
    </div>
  `
})
export class ActivitiesListComponent {
  activities = ACTIVITIES;
};
