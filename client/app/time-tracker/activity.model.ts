import { TimeInterval } from './time-interval.model';

export class ActivityRecord extends TimeInterval {
  private _current: TimeInterval;
  private _history: TimeInterval[] = [];
  private _fixedTime: number = 0;

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
      this._fixedTime = this._history.reduce((s, i) => s + (i.isUseful && !i.isDeleted? i.totalTime : 0), 0);
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
    return this._fixedTime + this.currentTime;
  };

  get currentTime(): number {
    return this._current? this._current.totalTime : 0;
  };

  get isActive(): boolean {
    return !!this._current;
  }

  get efficiency(): number {
    let start = this._startedAt ? this._startedAt.valueOf() : Date.now();
    let end = this._finishedAt? this._finishedAt.valueOf() : Date.now();
    let runtime = end - start;
    return runtime > 0? this.totalTime / runtime : 0;
  }

  get history(): TimeInterval[] {
    return this._history;
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
  private fixedTime: number = 0;
  private current: ActivityRecord;
  private _history: ActivityRecord[] = [];

  constructor(title: string) {
    this.title = title;

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
      this._history.push(this.current);
      this.fixedTime = this._history.reduce((s, i) => s + (i.isUseful && !i.isDeleted? i.totalTime : 0), 0);
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
    return this.isActive && this.current.isActive;
  }

  get historyRecords(): ActivityRecord[] {
    return this._history;
  };

  get currentIntervals(): TimeInterval[] {
    return this.current? this.current.history : [];
  };
};
