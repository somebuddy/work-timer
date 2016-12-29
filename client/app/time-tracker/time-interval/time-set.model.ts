import { TimeInterval } from './time-interval.model';

export class TimeSet extends TimeInterval {
  private _current: TimeInterval;
  private _subs: TimeInterval[] = [];

  constructor(start?: Date, end?: Date) {
    super(start, end);
    if (start && end) {
      this.add(start, end);
    }
  }

  get subs(): TimeInterval[] {
    return this._subs;
  };

  get current(): TimeInterval {
    return this._current;
  }

  public add(start: Date, end: Date): void;
  public add(ti: TimeInterval): void;
  public add(start: TimeInterval | Date, end?: Date): void {
    let ti: TimeInterval;
    if (start instanceof Date) {
      ti = new TimeInterval(start, end);
    } else {
      ti = start;
    }

    if (!ti.startedAt) {
      throw new RangeError('time interval in time set must be started');
    }
    if (!ti.finishedAt) {
      throw new RangeError('time interval in time set must be finished');
    }
    if (!this.startedAt || this.startedAt.valueOf() > ti.startedAt.valueOf()) {
      this.startedAt = ti.startedAt;
    }
    if (this.finishedAt && this.finishedAt.valueOf() < ti.finishedAt.valueOf()) {
      this.finishedAt = ti.finishedAt;
    }
    this._subs.push(ti);
  };

  public start() {
    if (!this._current && !this.finishedAt) {
      this._current = new TimeInterval();
      this._current.start();
      super.start();
    }
  };

  public pause() {
    if (this.current) {
      this.current.stop();
      this.add(this.current);
      this._current = undefined;
    }
  };

  public stop() {
    this.pause();
    super.stop();
  };

  get usefulTime(): number {
    if (this.isUseful) {
      return (this.current ? this.current.usefulTime : 0) +
        this._subs
          .filter(v => !v.isDeleted)
          .reduce((s, e) => s + e.usefulTime, 0);
    }
    return 0;
  };

  get efficiency(): number {
    return this.totalTime > 0? this.usefulTime / this.totalTime : 0;
  };
};
