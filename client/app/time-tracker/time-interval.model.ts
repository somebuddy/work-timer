export class TimeInterval {
  public isUseful: boolean = true;
  public comment: string;
  protected _startedAt: Date;
  protected _finishedAt: Date;
  private deletedAt: Date;

  constructor(start: Date = null, end?: Date) {
    this._startedAt = start;
    this._finishedAt = end;
  }

  get startedAt(): Date {
    return this._startedAt;
  }

  get finishedAt(): Date {
    return this._finishedAt;
  }

  get totalTime(): number {
    return (this._finishedAt ? this._finishedAt.valueOf() : Date.now())
      - (this._startedAt ? this._startedAt.valueOf() : Date.now());
  }

  public start() {
    this._startedAt = new Date();
  }

  public stop() {
    this._finishedAt = new Date();
  }

  public delete() {
    this.deletedAt = new Date();
  };

  public restore() {
    this.deletedAt = null;
  };

  get isDeleted() {
    return !!this.deletedAt;
  }
};
