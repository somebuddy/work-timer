import { TimeInterval } from './time-interval.model';
import { TimeSet } from './time-set.model';

describe('Time Interval', () => {
  var ts: TimeSet;

  beforeEach(() => {
    ts = new TimeSet();
  })

  it('should be time interval', () => {
    expect(ts).toEqual(jasmine.any(TimeInterval));
  });

  it('should have no subs', () => {
    expect(ts.subs.length).toEqual(0);
  });

  describe('add method', () => {
    var ti = new TimeInterval();

    beforeEach(() => {
      ts = new TimeSet();
      ti = new TimeInterval(new Date(2016, 11, 26), new Date(2016, 11, 27));
    });

    it('should add time interval into array', () => {
      ts.add(ti);
      expect(ts.subs.length).toEqual(1);
      expect(ts.subs).toEqual(jasmine.arrayContaining([ti]));
    });

    it('should throw error if interval is not started', () => {
      ti = new TimeInterval();
      expect(() => {
        ts.add(ti);
      }).toThrowError(RangeError);
    });

    it('should throw error if interval is not finished', () => {
      ti.finishedAt = undefined;
      expect(() => {
        ts.add(ti);
      }).toThrowError(RangeError);
    });

    it('should update time set start time', () => {
      ts.add(ti);
      expect(ts.startedAt).toEqual(ti.startedAt);
    });

    it('should not update time set start time if started before', () => {
      ts.startedAt = new Date(2016, 11, 25);
      ts.add(ti);
      expect(ts.startedAt).toEqual(new Date(2016, 11, 25));
    });

    it('should update time set start time if interval was started before', () => {
      ts.startedAt = new Date(2016, 11, 27);
      ts.add(ti);
      expect(ts.startedAt).toEqual(new Date(2016, 11, 26));
    });

    it('should update time set finished time', () => {
      ts.startedAt = new Date(2016, 11, 25);
      ts.finishedAt = new Date(2016, 11, 26);
      ts.add(ti);
      expect(ts.finishedAt).toEqual(new Date(2016, 11, 27));
    });

    it('should not update time set finished time if interval finished before', () => {
      ts.startedAt = new Date(2016, 11, 25);
      ts.finishedAt = new Date(2016, 11, 28);
      ts.add(ti);
      expect(ts.finishedAt).toEqual(new Date(2016, 11, 28));
    });

    it('should not update time set finished time if it was undefined before', () => {
      ts.startedAt = new Date(2016, 11, 27);
      ts.add(ti);
      expect(ts.finishedAt).toBeUndefined();
    });

    it('should create and add new interval with start and end', () => {
      ts.add(new Date(2016, 11, 26), new Date(2016, 11, 27));
      expect(ts.subs).toEqual(jasmine.arrayContaining([ti]));
    });

    xit('should throw error if interval intersect with any exisiting?', () => {

    });
  });

  describe('finished time set creation', () => {
    it('should add new interval with full length', () => {
      ts = new TimeSet(new Date(2016, 11, 26), new Date(2016, 11, 27));
      expect(ts.subs.length).toEqual(1);

      let ti = new TimeInterval(new Date(2016, 11, 26), new Date(2016, 11, 27));
      expect(ts.subs).toEqual(jasmine.arrayContaining([ti]));
    });
  });

  describe('pause method', () => {
    beforeEach(() => {
      ts = new TimeSet();
    })

    xit('should call add method', () => {
      spyOn(ts, 'add');
      ts.pause();
      expect(ts.add).toHaveBeenCalled();
    })
  });
});
