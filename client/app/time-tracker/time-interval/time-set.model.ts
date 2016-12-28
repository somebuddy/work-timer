import { TimeInterval } from './time-interval.model';

export class TimeSet extends TimeInterval {
  private _current: TimeInterval;
  private _subs: TimeInterval[] = [];

  get subs(): TimeInterval[] {
    return this._subs;
  };

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

  public pause() {

  }
};
