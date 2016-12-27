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

  get startedAt(): Date {
    return this._startedAt? new Date(this._startedAt): undefined;
  }

  set startedAt(start: Date) {
    if (start && (start.valueOf() > Date.now())) {
      throw new RangeError('Can\' set start time greater than current time');
    }
    if (start && this._finishedAt && (start.valueOf() >= this._finishedAt.valueOf())) {
      throw new RangeError('Can\' set start time greater or equal finish time');
    }
    if (!start && this._finishedAt) {
      throw new RangeError('Can\' reset start time for finished interval');
    }
    this._startedAt = start? new Date(start): undefined;
  };

  get finishedAt(): Date {
    return this._finishedAt? new Date(this._finishedAt): undefined;
  };

  set finishedAt(end: Date) {
    if (end && (end.valueOf() > Date.now())) {
      throw new RangeError('Can\' set finish time greater than current time');
    }
    if (end && this._startedAt && (end.valueOf() <= this._startedAt.valueOf())) {
      throw new RangeError('Can\' set finish time less or equal start time');
    }
    if (end && !this._startedAt) {
      throw new RangeError('Can\' set finish time for not started interval');
    }
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
