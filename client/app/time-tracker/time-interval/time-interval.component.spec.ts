import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { TimeIntervalComponent } from './time-interval.component';
import { TimeInterval } from './time-interval.model';
import { TimePipe } from '../shared/time.pipe';

describe('TimeIntervalComponent', () => {
  let comp: TimeIntervalComponent;
  let fixture: ComponentFixture<TimeIntervalComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let ti: TimeInterval;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TimeIntervalComponent, TimePipe ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeIntervalComponent);

    comp = fixture.componentInstance;

    ti = new TimeInterval();

    de = fixture.debugElement.query(By.css('.time-slot'));
  });

  it('should be empty without time inteval', () => {
    expect(de).toBeNull();
  });

  it('should be empty if not started', () => {
    comp.slot = ti;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.time-slot'));
    expect(de).toBeNull();
  });

  it('should be time-slot element with time interval', () => {
    comp.slot = ti;
    ti.start();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.time-slot'));
    expect(de).not.toBeNull();
  });

  describe('time slot element', () => {
    beforeEach(() => {
      comp.slot = ti;
      jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 0, 0));
      ti.start();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.time-slot'));
      el = de.nativeElement;
    });

    afterEach(() => {
      jasmine.clock().mockDate();
    });

    describe('useful checker', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot .useful-checker'));
        el = de.nativeElement;
      });

      it('should only one exist', () => {
        expect(de).not.toBeNull();

        expect(
          fixture.debugElement.queryAll(By.css('.time-slot .useful-checker')).length
        ).toBe(1);
      });

      it('should be with class checked', () => {
        expect(el.className).toContain('checked');
      });

      it('should be without class checked if not useful interval', () => {
        ti.isUseful = false;
        fixture.detectChanges();
        expect(el.className).not.toContain('checked');
      });

      it('should toggle model isUseful by click', () => {
        ti.isUseful = true;
        fixture.detectChanges();
        de.triggerEventHandler('click', null);
        expect(ti.isUseful).toEqual(false);

        de.triggerEventHandler('click', null);
        expect(ti.isUseful).toEqual(true);
      });
    });

    describe('period', () => {
      let dp = new DatePipe('en-US');

      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot .period'));
        el = de.nativeElement;
      });

      it('should only one exist', () => {
        expect(de).not.toBeNull();

        expect(
          fixture.debugElement.queryAll(By.css('.time-slot .period')).length
        ).toBe(1);
      });

      it('should display start date', () => {
        de = de.query(By.css('.dates .start'));
        expect(de).not.toBeNull();

        el = de.nativeElement;
        expect(el.textContent).toEqual(dp.transform(ti.startedAt, 'mediumDate'));
      });

      it('should not display finish date if not finished', () => {
        de = de.query(By.css('.dates .finish'));
        expect(de).toBeNull();
      });

      it('should display finish date', () => {
        jasmine.clock().mockDate(new Date(2017, 0, 3, 9, 10, 0));
        ti.stop();
        fixture.detectChanges();
        de = de.query(By.css('.dates .finish'));
        expect(de).not.toBeNull();

        el = de.nativeElement;
        expect(el.textContent).toEqual(dp.transform(ti.finishedAt, 'mediumDate'));
      });

      it('should not display finish date if it is equal to start date', () => {
        jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 10, 0));
        ti.stop();
        fixture.detectChanges();
        de = de.query(By.css('.dates .finish'));
        expect(de).toBeNull();
      });

      it('should display start time', () => {
        de = de.query(By.css('.times .start'));
        expect(de).not.toBeNull();

        el = de.nativeElement;
        expect(el.textContent).toEqual(dp.transform(ti.startedAt, 'mediumTime'));
      });

      it('should display finish time', () => {
        jasmine.clock().mockDate(new Date(2017, 0, 3, 9, 10, 0));
        ti.stop();
        fixture.detectChanges();
        de = de.query(By.css('.times .finish'));
        expect(de).not.toBeNull();

        el = de.nativeElement;
        expect(el.textContent).toEqual(dp.transform(ti.finishedAt, 'mediumTime'));
      });

      it('should not display finish time if not finished', () => {
        de = de.query(By.css('.times .finish'));
        expect(de).toBe(null);
      });

      it('should display stop button time if not finished', () => {
        de = de.query(By.css('.times .btn.stop'));
        expect(de).not.toBe(null);
      });

      it('should not display stop button time if finished', () => {
        jasmine.clock().mockDate(new Date(2017, 0, 3, 9, 10, 0));
        ti.stop();
        fixture.detectChanges();
        de = de.query(By.css('.times .btn.stop'));
        expect(de).toBe(null);
      });

      it('should call stop action on click stop button', () => {
        spyOn(ti, 'stop');
        de = de.query(By.css('.times .btn.stop'));
        de.triggerEventHandler('click', null);
        expect(ti.stop).toHaveBeenCalled();
      });
    });

    describe('comment', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot .comment'));
        el = de.nativeElement;
      });

      it('should only one exist', () => {
        expect(de).not.toBeNull();

        expect(
          fixture.debugElement.queryAll(By.css('.time-slot .comment')).length
        ).toBe(1);
      });

      it('should display comment', () => {
        expect(el.textContent).toEqual('');

        ti.comment = 'test comment';
        fixture.detectChanges();
        expect(el.textContent).toEqual('test comment');
      });
    });

    describe('timer', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot .timer'));
        el = de.nativeElement;
      });

      it('should only one exist', () => {
        expect(de).not.toBeNull();

        expect(
          fixture.debugElement.queryAll(By.css('.time-slot .timer')).length
        ).toBe(1);
      });

      it('should display useful time', () => {
        expect(el.textContent).toEqual('0:00:00.0');

        jasmine.clock().mockDate(new Date(2017, 0, 2, 9, 10, 0));
        fixture.detectChanges();
        expect(el.textContent).toEqual('0:10:00.0');

        jasmine.clock().mockDate(new Date(2017, 0, 3, 9, 50, 0));
        fixture.detectChanges();
        expect(el.textContent).toEqual('24:50:00.0');
      });
    });

    describe('actions', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot .actions'));
        el = de.nativeElement;
      });

      it('should only one exist', () => {
        expect(de).not.toBeNull();

        expect(
          fixture.debugElement.queryAll(By.css('.time-slot .actions')).length
        ).toBe(1);
      });

      it('should have delete button', () => {
        de = de.query(By.css('.btn.delete'));
        expect(de).not.toBeNull();
      });

      it('should not have delete button if deleted', () => {
        ti.delete();
        fixture.detectChanges();

        de = de.query(By.css('.btn.delete'));
        expect(de).toBeNull();
      });

      it('should call delete method on delete button click', () => {
        de = de.query(By.css('.btn.delete'));
        de.triggerEventHandler('click', null);
        expect(ti.isDeleted).toBe(true);
      });

      it('should have restore button if deleted', () => {
        ti.delete();
        fixture.detectChanges();

        de = de.query(By.css('.btn.restore'));
        expect(de).not.toBeNull();
      });

      it('should not have restore button if not deleted', () => {
        de = de.query(By.css('.btn.restore'));
        expect(de).toBeNull();
      });

      it('should call restore method on restore button click', () => {
        ti.delete();
        fixture.detectChanges();
        expect(ti.isDeleted).toBe(true);

        de = de.query(By.css('.btn.restore'));
        de.triggerEventHandler('click', null);
        expect(ti.isDeleted).toBe(false);
      });
    });

    describe('modifiers', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot'));
        el = de.nativeElement;
        ti.isUseful = false;
        ti.delete();
        fixture.detectChanges();
      });

      it('should have delete class if deleted', () => {
        expect(el.className).toContain('deleted');
      });

      it('should not have delete class if not deleted', () => {
        ti.restore();
        fixture.detectChanges();
        expect(el.className).not.toContain('deleted');
      });

      it('should have useful class if useful', () => {
        ti.isUseful = true;
        fixture.detectChanges();
        expect(el.className).toContain('useful');
      });

      it('should change useful class on model change', () => {
        ti.isUseful = false;
        fixture.detectChanges();
        expect(el.className).not.toContain('useful');
      });
    });
  });
});
