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
});
