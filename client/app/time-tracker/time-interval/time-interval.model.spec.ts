import { TimeInterval } from './time-interval.model';

describe('Time Interval', () => {
  var interval: TimeInterval;

  describe('initial values', () => {
    beforeEach(() => {
      interval = new TimeInterval();
    });

    it('should be created with open intervals', () => {
      expect(interval.startedAt).toBeNull();
      expect(interval.finishedAt).toBeNull();
    });

    it('should be useful', () => {
      expect(interval.isUseful).toBe(true);
    });
  });

  describe('values in constructor', () => {
    var start: Date;
    var end: Date;

    beforeEach(() => {
      start = new Date(2016, 12, 20);
      end = new Date(2016, 12, 21);
      interval = new TimeInterval(start, end);
    });

    it('should set start and finish in constructor', () => {
      expect(interval.startedAt.valueOf()).toBe(start.valueOf());
      expect(interval.finishedAt.valueOf()).toBe(end.valueOf());
    });

    it('should copy date time instead of reference', () => {
      expect(interval.startedAt).not.toBe(start);
      expect(interval.finishedAt).not.toBe(end);
    });

    xit('should not set finish if start is not defined', () => {
    });
  });

  describe('start and finish setters', () => {
    var start: Date;
    var end: Date;

    beforeEach(() => {
      interval = new TimeInterval();
      start = new Date(2016, 12, 20);
      end = new Date(2016, 12, 21);
    });

    it('should set start date', () => {
      interval.startedAt = start;
      expect(interval.startedAt.valueOf()).toBe(start.valueOf());
    });

    it('should copy start date instead of reference', () => {
      interval.startedAt = start;
      expect(interval.startedAt).not.toBe(start);
    });

    it('should set finish date', () => {
      interval.finishedAt = end;
      expect(interval.finishedAt.valueOf()).toBe(end.valueOf());
    });

    it('should copy finish date instead of reference', () => {
      interval.finishedAt = end;
      expect(interval.finishedAt).not.toBe(end);
    });

    xit('should not set finish if not started', () => {

    });

    xit('should not set finish if before started', () => {

    });

    xit('should not set start if after finished', () => {

    });

    xit('should not set started to null or undefined', () => {

    });
  })

  it('should be started', () => {
    const interval = new TimeInterval();
    interval.start();
    expect(interval.startedAt).not.toBeNull();
  });
});
