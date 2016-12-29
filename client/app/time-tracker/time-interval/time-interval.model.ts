export class TimeInterval {
  public isUseful: boolean = true;
  public comment: string;
  protected _startedAt: Date;
  protected _finishedAt: Date;
  private _deletedAt: Date;

  constructor(start?: Date, end?: Date) {
    if (start) {
      this.startedAt = new Date(start);
      this.finishedAt = end? new Date(end): undefined;
    }
  }

  private check(start: Date, end: Date) {
    if (start && start.valueOf() > Date.now()) {
      throw new RangeError('Can\'t set start time greater than current time');
    }
    if (end && end.valueOf() > Date.now()) {
      throw new RangeError('Can\'t set finish time greater than current time');
    }
    if (!start && end) {
      throw new RangeError('Interval must be started');
    }
    if (start && end && start.valueOf() >= end.valueOf()) {
      throw new RangeError('Finish time can\'t be less than or equal start time');
    }
  }

  get startedAt(): Date {
    return this._startedAt? new Date(this._startedAt): undefined;
  }

  set startedAt(start: Date) {
    this.check(start, this._finishedAt);
    this._startedAt = start? new Date(start): undefined;
  };

  get finishedAt(): Date {
    return this._finishedAt? new Date(this._finishedAt): undefined;
  };

  set finishedAt(end: Date) {
    this.check(this.startedAt, end);
    this._finishedAt = end? new Date(end): undefined;
  };

  get totalTime(): number {
    return (this._finishedAt ? this._finishedAt.valueOf() : Date.now())
       - (this._startedAt ? this._startedAt.valueOf() : Date.now());
  };

  get usefulTime(): number {
    return this.isUseful? this.totalTime: 0;
  };

  public start() {
    if (!this.startedAt) {
      this.startedAt = new Date();
    }
  };

  public stop() {
    if (!this.finishedAt && this.startedAt) {
      this.finishedAt = new Date();
    }
  }

  public delete() {
    this._deletedAt = new Date();
  };

  public restore() {
    this._deletedAt = undefined;
  };

  get deletedAt(): Date {
    return this._deletedAt;
  };

  get isDeleted():boolean {
    return !!this.deletedAt;
  };
};
