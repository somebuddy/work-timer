export class TimeInterval {
  public isUseful: boolean = true;
  public comment: string;
  private _startedAt: Date;
  private _finishedAt: Date;

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
    return (this._finishedAt ? this._finishedAt.valueOf() : Date.now()) - this._startedAt.valueOf();
  }

  public start() {
    this._startedAt = new Date();
  }

  public stop() {
    this._finishedAt = new Date();
  }
};
