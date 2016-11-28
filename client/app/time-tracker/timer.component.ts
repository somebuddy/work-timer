import { Component } from '@angular/core';

export class Timer {
  activity: string;
  currentTime: number;
};

@Component({
  selector: 'box-timer',
  template: `
    <div class="box-timer">
      <div class="activity">
        <label>Current activity:</label>
        <div class="value">{{ timer.activity }}</div>
        <input [(ngModel)]="timer.activity" placeholder="What are you doing now?">
      </div>
      <div class="time">
        <label>Current time</label>
        <div class="value">{{ timer.currentTime }}</div>
      </div>
    </div>
  `
})
export class TimerComponent {
  timer: Timer = {
    activity: 'What are you doing now?',
    currentTime: 0,
  }
};
