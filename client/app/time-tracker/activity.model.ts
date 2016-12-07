export class ActivityRecord {
  public comment: string;
  public startedAt: Date;
  public finishedAt: Date;

  constructor(start: Date = new Date(), end?: Date) {
    this.startedAt = start;
    this.finishedAt = end;
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
  }

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
    if (this.current) {
      return Date.now() - this.current.startedAt.valueOf();
    }
    return 0;
  };

  get totalTime(): number {
    let result = this.fixedTime;
    if (this.current) {
      result += Date.now() - this.current.startedAt.valueOf();
    }
    return result;
  };

  get doneTime(): number {
    return this.fixedTime;
  };

  public start(): void {
    this.pause();
    this.current = new ActivityRecord();
  };

  public pause(): void {
    if (this.current) {
      const a = this.current;
      this.current = null;
      a.finishedAt = new Date();
      this.fixedTime += a.finishedAt.valueOf() - a.startedAt.valueOf();
      this.history.push(a);
    }
  };

  public stop(): void {
    this.pause();
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
  }
};
