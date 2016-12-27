import { TimeInterval } from './time-interval.model';

describe('Time Interval', () => {
  var interval: TimeInterval;

  describe('object creation', () => {
    var start: Date;
    var end: Date;

    beforeEach(() => {
      start = new Date(2016, 11, 20);
      end = new Date(2016, 11, 21);
    });

    it('should be created with open intervals', () => {
      interval = new TimeInterval();
      expect(interval.startedAt).toBeUndefined();
      expect(interval.finishedAt).toBeUndefined();
    });

    it('should be useful', () => {
      interval = new TimeInterval();
      expect(interval.isUseful).toBe(true);
    });

    it('should be created with start and finish time', () => {
      interval = new TimeInterval(start, end);
      expect(interval.startedAt.valueOf()).toBe(start.valueOf());
      expect(interval.finishedAt.valueOf()).toBe(end.valueOf());
    });

    it('should be created with start time', () => {
      interval = new TimeInterval(start);
      expect(interval.startedAt.valueOf()).toBe(start.valueOf());
    });

    it('should copy date time instead of reference', () => {
      interval = new TimeInterval(start, end);
      expect(interval.startedAt).not.toBe(start);
      expect(interval.finishedAt).not.toBe(end);
    });

    it('should not be created with finish time and without start time', () => {
      interval = new TimeInterval(undefined, end);
      expect(interval.startedAt).toBeUndefined();
      expect(interval.finishedAt).toBeUndefined();
    });
  });

  describe('startedAt property', () => {
    var start: Date;
    var nowTime: Date;

    beforeEach(() => {
      interval = new TimeInterval();
      start = new Date(2016, 11, 20, 12, 30);
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should set start date', () => {
      interval.startedAt = start;
      expect(interval.startedAt.valueOf()).toBe(start.valueOf());
    });

    it('should store a value instead of reference', () => {
      interval.startedAt = start;
      start.setMinutes(33);
      expect(interval.startedAt.getMinutes()).toEqual(30);
    });

    it('should return copy of date instead of reference', () => {
      interval.startedAt = start;
      interval.startedAt.setMinutes(33);
      expect(interval.startedAt.getMinutes()).toEqual(30);
    });

    it('could be set to undefined', () => {
      interval.startedAt = start;
      interval.startedAt = undefined;
      expect(interval.startedAt).toBeUndefined();
    });

    it('should throw error if new value after now', () => {
      jasmine.clock().mockDate(new Date(2016, 11, 20, 12, 29));

      expect(() => {
        interval.startedAt = new Date(2016, 11, 20, 12, 30);
      }).toThrowError(RangeError);

      expect(() => {
        interval.startedAt = new Date(2016, 11, 20, 12, 29);
      }).not.toThrowError(RangeError);
    });

    it('should throw error if after or equal finish time', () => {
      interval.startedAt = new Date(2016, 11, 20, 12, 20);
      interval.finishedAt = new Date(2016, 11, 20, 12, 25);

      expect(() => {
        interval.startedAt = new Date(2016, 11, 20, 12, 30);
      }).toThrowError(RangeError);

      expect(() => {
        interval.startedAt = new Date(2016, 11, 20, 12, 25);
      }).toThrowError(RangeError);
    });

    it('should throw error to setting undefined if was finished', () => {
      interval.startedAt = new Date(2016, 11, 20, 12, 20);
      interval.finishedAt = new Date(2016, 11, 20, 12, 25);

      expect(() => {
        interval.startedAt = undefined;
      }).toThrowError(RangeError);
    });
  });

  describe('finishedAt property', () => {
    var start: Date;
    var end: Date;

    beforeEach(() => {
      interval = new TimeInterval();
      start = new Date(2016, 11, 20);
      interval.startedAt = start;
      end = new Date(2016, 11, 21, 13, 30);
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should set finish date', () => {
      interval.finishedAt = end;
      expect(interval.finishedAt.valueOf()).toBe(end.valueOf());
    });

    it('should store a value instead of reference', () => {
      interval.finishedAt = end;
      end.setMinutes(33);
      expect(interval.finishedAt.getMinutes()).toEqual(30);
    });

    it('should return copy of date instead of reference', () => {
      interval.finishedAt = end;
      interval.finishedAt.setMinutes(33);
      expect(interval.finishedAt.getMinutes()).toEqual(30);
    });

    it('could be set to undefined', () => {
      interval.finishedAt = undefined;
      expect(interval.finishedAt).toBeUndefined();
    });

    it('should throw error if new value after now', () => {
      jasmine.clock().mockDate(new Date(2016, 11, 20, 12, 29));

      expect(() => {
        interval.finishedAt = new Date(2016, 11, 20, 12, 30);
      }).toThrowError(RangeError);

      expect(() => {
        interval.startedAt = new Date(2016, 11, 20, 12, 29);
      }).not.toThrowError(RangeError);
    });

    it('should throw error if before or equal start time', () => {
      interval.startedAt = new Date(2016, 11, 20, 12, 20);
      interval.finishedAt = new Date(2016, 11, 20, 12, 25);

      expect(() => {
        interval.finishedAt = new Date(2016, 11, 20, 12, 15);
      }).toThrowError(RangeError);

      expect(() => {
        interval.finishedAt = new Date(2016, 11, 20, 12, 20);
      }).toThrowError(RangeError);
    });

    it('should throw error to setting date if wasn\' started', () => {
      interval.startedAt = undefined;

      expect(() => {
        interval.finishedAt = new Date(2016, 11, 20, 12, 25);
      }).toThrowError(RangeError);
    });
  });

  describe('start method', () => {
    beforeEach(() => {
      interval = new TimeInterval();
      jasmine.clock().mockDate(new Date(2016, 11, 20));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should set start time to current time', () => {
      interval.start();
      expect(interval.startedAt).toEqual(new Date(2016, 11, 20));
    });

    it('should set not change start time if was started before', () => {
      interval.startedAt = new Date(2016, 11, 19);
      interval.start();
      expect(interval.startedAt).toEqual(new Date(2016, 11, 19));
    });
  });

  describe('stop method', () => {
    beforeEach(() => {
      interval = new TimeInterval();
      jasmine.clock().mockDate(new Date(2016, 11, 20));
      interval.startedAt = new Date(2016, 11, 18);
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should set finish to current time', () => {
      interval.stop();
      expect(interval.finishedAt).toEqual(new Date(2016, 11, 20));
    });

    it('should not change time if was finished before', () => {
      interval.finishedAt = new Date(2016, 11, 19);
      interval.stop();
      expect(interval.finishedAt).toEqual(new Date(2016, 11, 19));
    });

    it('should not change time if wasn\'t started', () => {
      interval.startedAt = undefined;
      expect(() => {
        interval.stop();
      }).not.toThrowError();
      expect(interval.finishedAt).toBeUndefined();
    });
  });

  describe('Total time', () => {
    beforeEach(() => {
      interval = new TimeInterval(new Date(2016, 11, 27, 10, 30), new Date(2016, 11, 27, 11));
      jasmine.clock().mockDate(new Date(2016, 11, 27, 11, 30));
    });

    it('should be equal to the number of milliseconds between start and finish time', () => {
      expect(interval.totalTime).toEqual(1800000);
    });

    it('should be equal 0 if not started', () => {
      interval.finishedAt = undefined;
      interval.startedAt = undefined;
      expect(interval.totalTime).toEqual(0);
    });

    it('should be equal to the number of ms between start and now if not finished', () => {
      interval.finishedAt = undefined;
      expect(interval.totalTime).toEqual(3600000);
    });
  });

  describe('Useful time', () => {
    beforeEach(() => {
      interval = new TimeInterval(new Date(2016, 11, 27, 10, 30), new Date(2016, 11, 27, 11));
    });

    it('should be equal to the length of interval if useful', () => {
      expect(interval.usefulTime).toEqual(1800000);
    });

    it('should be equal to zero if not useful', () => {
      interval.isUseful = false;
      expect(interval.usefulTime).toEqual(0);
    });
  });

  describe('Delete method', () => {
    beforeEach(() => {
      interval = new TimeInterval();
      jasmine.clock().mockDate(new Date(2016, 11, 27));
    });

    it('should mark the object as deleted', () => {
      expect(interval.isDeleted).toEqual(false);
      interval.delete();
      expect(interval.isDeleted).toEqual(true);
    });

    it('should set current time to deletedAt', () => {
      interval.delete();
      expect(interval.deletedAt).toEqual(new Date(2016, 11, 27));
    });
  });

  describe('Restore methods', () => {
    beforeEach(() => {
      interval = new TimeInterval();
      jasmine.clock().mockDate(new Date(2016, 11, 27));
      interval.delete();
    });

    it('should unset mark as deleted', () => {
      interval.restore();
      expect(interval.isDeleted).toEqual(false);
    });

    it('should unset deletedAt property', () => {
      interval.restore();
      expect(interval.deletedAt).toBeUndefined();
    });
  });
});
