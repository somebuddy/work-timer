import { TimeInterval } from './time-interval.model';

describe('Time Interval', () => {
  console.log('Time Interval testing...');

  it('should be useful', () => {
    const interval = new TimeInterval();
    expect(interval.isUseful).toBe(true);
  });
});
