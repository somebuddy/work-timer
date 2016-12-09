import { TimeInterval } from './time-interval.model';

export class ActivityRecord extends TimeInterval {
  private _current: TimeInterval;
  private _history: TimeInterval[] = [];

  constructor(start: Date = new Date(), end?: Date) {
    super(start, end);
  };

  public start() {
    if (!this.startedAt) {
      super.start();
    }
    this.resume();
  };

  public pause() {
    if (this._current) {
      this._current.stop();
      this._history.push(this._current);
      this._current = null;
    }
  };

  public resume() {
    if (!this._current) {
      this._current = new TimeInterval();
      this._current.start();
    }
  };

  public stop() {
    this.pause();
    super.stop();
  };

  get totalTime(): number {
    let time = this._history.reduce((s, i) => s + (i.isUseful? i.totalTime : 0), 0);
    return time + this.currentTime;
  };

  get currentTime(): number {
    return this._current? this._current.totalTime : 0;
  };
};

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
  private fixedTime: number;
  private current: ActivityRecord;
  private history: ActivityRecord[] = [];

  constructor(title: string) {
    this.title = title;
    this.fixedTime = 0;

    this.state[ActivityStateType.done] = new ActivityStateValue();
    this.state[ActivityStateType.deleted] = new ActivityStateValue();
    this.state[ActivityStateType.active] = new ActivityStateValue();
  }

  get currentTime(): number {
    return this.current? this.current.totalTime : 0;
  };

  get totalTime(): number {
    return this.fixedTime + this.currentTime;
  };

  get doneTime(): number {
    return this.fixedTime;
  };

  public start(): void {
    if (this.current) {
      this.current.resume();
    } else {
      this.current = new ActivityRecord();
      this.current.start();
    }
  };

  public pause(): void {
    if (this.current) {
      this.current.pause();
    }
  };

  public stop(): void {
    if (this.current) {
      this.current.stop();
      this.fixedTime += this.current.totalTime;
      this.history.push(this.current);
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

  get historyRecords(): ActivityRecord[] {
    return this.history;
  };
};
