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

  describe('start method', () => {
    beforeEach(() => {
      ts = new TimeSet();
      jasmine.clock().mockDate(new Date(2016,11,20));
      ts.start();
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should create current time interval', () => {
      expect(ts.current).toBeDefined();
    });

    it('should current interval be started', () => {
      expect(ts.current.startedAt).toEqual(new Date(2016, 11, 20));
    });

    xit('should current interval start method be called', () => {
      // need mock the time interval object
    });

    it('should not recreate current if created before', () => {
      jasmine.clock().mockDate(new Date(2016, 11, 21));
      ts.start();
      expect(ts.current.startedAt).toEqual(new Date(2016, 11, 20));
    });

    it('should update time set start time to current time', () => {
      expect(ts.startedAt).toEqual(new Date(2016, 11, 20));
    });

    it('should not update time set start time if was started before', () => {
      ts = new TimeSet();
      ts.startedAt = new Date(2016, 11, 19);
      ts.start();
      expect(ts.startedAt).toEqual(new Date(2016, 11, 19));
    });

    it('should not create current if time set finished', () => {
      ts = new TimeSet(new Date(2016, 11, 1), new Date(2016, 11, 2));
      ts.start();
      expect(ts.current).toBeUndefined();
    });
  });

  describe('pause method', () => {
    beforeEach(() => {
      ts = new TimeSet();
      jasmine.clock().mockDate(new Date(2016,11,20));
      ts.start();
      jasmine.clock().mockDate(new Date(2016,11,21));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should stop current interval', () => {
      let current = ts.current;
      ts.pause();
      expect(current.finishedAt).toEqual(new Date(2016, 11, 21));
    });

    it('should add new sub', () => {
      ts.pause();
      expect(ts.subs.length).toEqual(1);
    });

    it('should not add new sub if no current', () => {
      ts = new TimeSet();
      ts.pause();
      expect(ts.subs.length).toEqual(0);
    });

    it('should not add new sub on second call', () => {
      ts.pause();
      ts.pause();
      expect(ts.subs.length).toEqual(1);
    });

    it('should call add method with current as parameter', () => {
      let current = ts.current;
      spyOn(ts, 'add');
      ts.pause();
      expect(ts.add).toHaveBeenCalledWith(current);
    });

    it('should reset current', () => {
      ts.pause();
      expect(ts.current).toBeUndefined();
    });
  });

  describe('stop method', () => {
    beforeEach(() => {
      ts = new TimeSet();
      jasmine.clock().mockDate(new Date(2016,11,20));
      ts.start();
      jasmine.clock().mockDate(new Date(2016,11,21));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should call pause method', () => {
      spyOn(ts, 'pause');
      ts.stop();
      expect(ts.pause).toHaveBeenCalled();
    });

    it('should set finish time', () => {
      ts.stop();
      expect(ts.finishedAt).toEqual(new Date(2016, 11, 21));
    })
  });

  describe('start-pause-stop workflow', () => {
    beforeEach(() => {
      ts = new TimeSet();
      jasmine.clock().mockDate(new Date(2016,11,20));
      ts.start();
      jasmine.clock().mockDate(new Date(2016,11,21));
      ts.pause();
      jasmine.clock().mockDate(new Date(2016,11,22));
      ts.start();
      jasmine.clock().mockDate(new Date(2016,11,23));
      ts.stop();
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should create new interval on each pause/stop', () => {
      expect(ts.subs.length).toEqual(2);
    });
  });

  describe('useful time counter', () => {
    let tis: TimeInterval[];

    beforeEach(() => {
      ts = new TimeSet();
      tis = [];

      tis.push(new TimeInterval(
        new Date(2016, 11, 20, 12, 30),
        new Date(2016, 11, 20, 12, 31)
      ));

      tis.push(new TimeInterval(
        new Date(2016, 11, 20, 12, 32),
        new Date(2016, 11, 20, 12, 34)
      ));

      tis.push(new TimeInterval(
        new Date(2016, 11, 20, 12, 35),
        new Date(2016, 11, 20, 12, 40)
      ));

      jasmine.clock().mockDate(new Date(2016,11,21));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should return subs length sum', () => {
      expect(ts.usefulTime).toEqual(0);
      ts.add(tis[0]);
      expect(ts.usefulTime).toEqual(60000);
      ts.add(tis[1]);
      expect(ts.usefulTime).toEqual(180000);
      ts.add(tis[2]);
      expect(ts.usefulTime).toEqual(480000);
    });

    it('should ignore not useful subs', () => {
      expect(ts.usefulTime).toEqual(0);
      ts.add(tis[0]);
      expect(ts.usefulTime).toEqual(60000);
      tis[1].isUseful = false;
      ts.add(tis[1]);
      expect(ts.usefulTime).toEqual(60000);
      ts.add(tis[2]);
      expect(ts.usefulTime).toEqual(360000);
    });

    it('should ignore deleted intervals', () => {
      expect(ts.usefulTime).toEqual(0);
      ts.add(tis[0]);
      expect(ts.usefulTime).toEqual(60000);
      tis[1].delete();
      ts.add(tis[1]);
      expect(ts.usefulTime).toEqual(60000);
      ts.add(tis[2]);
      expect(ts.usefulTime).toEqual(360000);
    });

    it('should add current interval time', () => {
      ts.start()
      jasmine.clock().mockDate(new Date(2016,11,21, 0, 0, 25));
      expect(ts.usefulTime).toEqual(25000);
      ts.add(tis[0]);
      expect(ts.usefulTime).toEqual(85000);
      ts.current.isUseful = false;
      expect(ts.usefulTime).toEqual(60000);
    });

    it('should return 0 if not useful', () => {
      ts.add(tis[0]);
      ts.add(tis[1]);
      ts.isUseful = false;
      expect(ts.usefulTime).toEqual(0);
    });

    it('efficiency getter should return part of usefult time in total', () => {
      expect(ts.efficiency).toEqual(0);
      ts.add(tis[0]);
      jasmine.clock().mockDate(new Date(2016, 11, 20, 12, 31));
      expect(ts.efficiency).toEqual(1);
      jasmine.clock().mockDate(new Date(2016, 11, 20, 12, 32));
      expect(ts.efficiency).toEqual(.5);
      jasmine.clock().mockDate(new Date(2016, 11, 20, 12, 29));
      expect(ts.efficiency).toEqual(0);
    });
  });
});
