import { TimeInterval } from './time-interval.model';
import { TimeSet } from './time-set.model';

describe('Time Interval', () => {
  var ts: TimeSet;

  it('should be time interval', () => {
    ts = new TimeSet();
    expect(ts).toEqual(jasmine.any(TimeInterval));
  });

  describe('inner intervals', () => {

  });
});
