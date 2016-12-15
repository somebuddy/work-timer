import { TimeInterval } from './time-interval.model';

export class TimeSet extends TimeInterval {
  private _current: TimeInterval;
  private _subs: TimeInterval[] = [];
}
