import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
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

  it('should be time-slot element with time interval', () => {
    comp.slot = ti;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.time-slot'));
    expect(de).not.toBeNull();
  });

  xit('should be empty if not started', () => {

  });

  describe('time slot element', () => {
    beforeEach(() => {
      comp.slot = ti;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.time-slot'));
      el = de.nativeElement;
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

      xit('should toggle model isUseful by click', () => {

      });
    });

    describe('period', () => {
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

      xit('should have start date', () => {

      });

      xit('should have finish date', () => {

      });

      xit('should not have finish date if it is equal to start date', () => {

      });

      xit('should not have finish date if not finished', () => {

      });

      xit('should have start time', () => {

      });

      xit('should have finish time', () => {

      });

      xit('should not have finish time if not finished', () => {

      });

      xit('should have stop button time if not finished', () => {

      });

      xit('should call stop action on click stop button', () => {

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

      xit('should display comment', () => {

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

      xit('should display useful time', () => {

      });

      xit('should update useful time', () => {

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

      xit('should have delete button', () => {

      });

      xit('should not have delete button if deleted', () => {

      });

      xit('should have restore button if deleted', () => {

      });

      xit('should not have restore button if not deleted', () => {

      });

      xit('should call delete method on delete button click', () => {

      });

      xit('should call restore method on restore button click', () => {

      });
    });

    describe('modifiers', () => {
      beforeEach(() => {
        de = fixture.debugElement.query(By.css('.time-slot'));
        el = de.nativeElement;
      });

      xit('should have delete class if deleted', () => {

      });

      xit('should have useful class if useful', () => {

      });

      xit('should not have delete class if not deleted', () => {

      });

      xit('should change deleted class on model change', () => {

      });

      xit('should change useful class on model change', () => {

      });
    });
  });
});
