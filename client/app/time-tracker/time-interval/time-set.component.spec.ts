import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeSet } from './time-set.model';
import { TimeSetComponent } from './time-set.component';

fdescribe('Time set widget', () => {
  let comp: TimeSetComponent;
  let fixture: ComponentFixture<TimeSetComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let ts: TimeSet;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSetComponent ],
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
});
