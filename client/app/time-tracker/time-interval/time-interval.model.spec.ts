import { TimeInterval } from './time-interval.model';

describe('Time Interval', () => {
  console.log('Time Interval testing...');

  it('should be useful', () => {
    const interval = new TimeInterval();
    expect(interval.isUseful).toBe(true);
  });

  it('should be started', () => {
    const interval = new TimeInterval();
    interval.start();
    expect(interval.startedAt).not.toBeNull();
  })
});
