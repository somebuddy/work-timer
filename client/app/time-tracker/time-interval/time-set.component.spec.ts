import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeSet } from './time-set.model';
import { TimeSetComponent } from './time-set.component';
import { TimePipe } from '../shared/time.pipe';

describe('Time set widget', () => {
  let comp: TimeSetComponent;
  let fixture: ComponentFixture<TimeSetComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let ts: TimeSet;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSetComponent, TimePipe ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSetComponent);
    comp = fixture.componentInstance;
    ts = new TimeSet();
    comp.set = ts;
    fixture.detectChanges();

    de = fixture.debugElement;
  })

  it('should contain time-set element', () => {
    de = de.query(By.css('.time-set'));
    expect(de).not.toBeNull();
  });

  it('should not contain time-set element if set is undefined', () => {
    comp.set = undefined;
    fixture.detectChanges();
    de = de.query(By.css('.time-set'));
    expect(de).toBeNull();
  });

  describe('comment', () => {
    beforeEach(() => {
      de = de.query(By.css('.time-set .comment'));
    });

    it('should contain comment element', () => {
      expect(de).not.toBeNull();
    });

    it('should display comment value', () => {
      de = de.query(By.css('.value'));
      el = de.nativeElement;
      expect(el.textContent).toEqual('');

      ts.comment = 'test comment';
      fixture.detectChanges();
      expect(el.textContent).toEqual('test comment');
    });
  });

  describe('start time', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 0, 0));
      ts.start();
      fixture.detectChanges();
      de = de.query(By.css('.time-set'));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    })

    it('should not contain start time element if not started', () => {
      ts.startedAt = undefined;
      fixture.detectChanges();
      de = de.query(By.css('.start-time'));
      expect(de).toBeNull();
    });

    it('should contain start time element', () => {
      de = de.query(By.css('.start-time'));
      expect(de).not.toBeNull();
    });

    it('should display start time', () => {
      de = de.query(By.css('.start-time .value'));
      el = de.nativeElement;
      expect(el.textContent).toEqual('Jan 2, 2017, 9:00:00 AM');
    });
  });

  fdescribe('summary', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 0, 0));
      ts.start();
      fixture.detectChanges();
      de = de.query(By.css('.time-set .summary'));
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    it('should have element for summary timer', () => {
      expect(de).not.toBeNull();
    });

    it('should not have element for summary timer if not started', () => {
      ts.startedAt = undefined;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.time-set .summary'));
      expect(de).toBeNull();
    });

    it('should contain header element', () => {
      de = de.query(By.css('header'));
      expect(de).not.toBeNull();
      el = de.nativeElement;
      expect(el.textContent).toEqual('total');
    });

    it('should contain value.main element', () => {
      de = de.query(By.css('.value.main'));
      expect(de).not.toBeNull();
    });

    it('should display time set useful time', fakeAsync(() => {
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 10, 10));
      fixture.detectChanges();

      de = de.query(By.css('.value.main'));
      el = de.nativeElement;
      expect(el.textContent).toEqual('0:10:10.0');
    }));

    it('should contain value.secondary element', () => {
      de = de.query(By.css('.value.secondary'));
      expect(de).not.toBeNull();
    });

    it('should display efficiency percent', () => {
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 10, 0));
      ts.pause();
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 15, 0));
      ts.start();
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 20, 0));
      fixture.detectChanges();

      de = de.query(By.css('.value.secondary'));
      el = de.nativeElement;
      expect(el.textContent).toEqual('75%');
    });

    xit('should contain button to expand/collapse inner intervals list', () => {

    });

    xit('should contain button to expand/collapse inner intervals list if inner list is empty', () => {

    });

    xit('should toggle isInnerListDisplayed property by click', () => {

    });

    xit('should have expand button if not isInnerListDisplayed', () => {

    });

    xit('should have collapse button if isInnerListDisplayed', () => {

    });
  });

  describe('now', () => {
    beforeEach(() => {
      ts.start();
      fixture.detectChanges();
      de = de.query(By.css('.time-set .now'));
    });

    it('should have element for now timer', () => {
      expect(de).not.toBeNull();
    });

    it('should not have element for now timer if not started', () => {
      ts.startedAt = undefined;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.time-set .now'));
      expect(de).toBeNull();
    });

    it('should contain header element', () => {
      de = de.query(By.css('header'));
      expect(de).not.toBeNull();
    });

    xit('should contain "now" if current interval exists', () => {

    });

    xit('should contain "paused" if current interval is not exists', () => {

    });

    it('should contain value.main element', () => {
      de = de.query(By.css('.value.main'));
      expect(de).not.toBeNull();
    });

    xit('should display useful time for current time interval', () => {

    });

    xit('should display time after last interval if not active', () => {

    });

    xit('should display time after start if not active and not have inner intervals', () => {

    });

    xit('should contain value.secondary element', () => {
      de = de.query(By.css('.value.secondary'));
      expect(de).not.toBeNull();
    });

    xit('should display useful time of best inner intervals', () => {

    });

    xit('should contain button to reset current interval', () => {

    });

    xit('should not contain reset button if paused', () => {

    });

    xit('should reset current interval by click    ', () => {

    });
  });

  describe('useful flag', () => {
    xit('should contain useful-flag element', () => {

    });

    xit('should have class checked if time set is useful', () => {

    });

    xit('should not have class checked if time set is not useful', () => {

    });

    xit('should toggle useful property in time set by click', () => {

    });

  });

  describe('actions', () => {
    xit('should contain actions element', () => {

    });

    xit('should contain pause button if active', () => {

    });

    xit('should not contain pause button if not active', () => {

    });

    xit('should contain stop button if not finished', () => {

    });

    xit('should not contain stop button if finished', () => {

    });

    xit('should contain start button if not active and not finished', () => {

    });

    xit('should not contain start button if active or finished', () => {

    });

    xit('should call start method on start button click', () => {

    });

    xit('should call pause method on pause button click', () => {

    });

    xit('should call stop method on stop button click', () => {

    });

  });

  describe('inner intervals list', () => {
    xit('should not display inner intervals list by default', () => {

    });

    xit('should toggle displaying inner interval list by click on expand button', () => {

    });

  });
});
