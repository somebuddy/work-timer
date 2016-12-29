import { TimeInterval } from '../time-interval/time-interval.model';
import { TimeSet } from '../time-interval/time-set.model';

export enum ActivityStateType {
  done,
  active,
  deleted
};

export class ActivityStateValue {
  private val: boolean = false;
  private updatedAt: Date;

  constructor(state: boolean = false) {
    this.val = state;
  };

  get value() {
    return this.val;
  };

  set value(newValue: boolean) {
    if (this.val !== newValue) {
      this.val = newValue;
      this.updatedAt = new Date();
    }
  };

  get changedAt() {
    return this.updatedAt;
  };

  public toggle() {
    this.value = !this.value;
  };
};

type ActivityState = {
  [state: number]: ActivityStateValue
};

export class Activity {
  public title: string;
  public state: ActivityState = {};
  private fixedTime: number = 0;
  private current: TimeSet;
  private _history: TimeSet[] = [];

  constructor(title: string) {
    this.title = title;

    this.state[ActivityStateType.done] = new ActivityStateValue();
    this.state[ActivityStateType.deleted] = new ActivityStateValue();
    this.state[ActivityStateType.active] = new ActivityStateValue();
  }

  get currentTime(): number {
    return this.current? this.current.usefulTime : 0;
  };

  get totalTime(): number {
    return this.fixedTime + this.currentTime;
  };

  get doneTime(): number {
    return this.fixedTime;
  };

  public start(): void {
    if (!this.current) {
      this.current = new TimeSet();
    }
    this.current.start();
  };

  public pause(): void {
    if (this.current) {
      this.current.pause();
    }
  };

  public stop(): void {
    if (this.current) {
      this.current.stop();
      this._history.push(this.current);
      this.fixedTime = this._history.reduce((s, i) => s + (!i.isDeleted? i.usefulTime : 0), 0);
      this.current = null;
    }
  };

  public done(): void {
    this.stop();
    this.state[ActivityStateType.done].value = true;
  };

  get isDone(): boolean {
    return this.state[ActivityStateType.done].value;
  };

  get isActive(): boolean {
    return !!this.current;
  };

  get isRunning(): boolean {
    return this.isActive && !!this.current.current;
  }

  get historyRecords(): TimeSet[] {
    return this._history;
  };

  get currentRecord(): TimeSet {
    return this.current;
  }

  get currentIntervals(): TimeInterval[] {
    return this.current? this.current.subs : [];
  };
};
