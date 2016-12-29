import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { TimeIntervalComponent } from './time-interval.component';
import { TimePipe } from '../shared/time.pipe';

describe('TimeIntervalComponent', () => {
  let comp: TimeIntervalComponent;
  let fixture: ComponentFixture<TimeIntervalComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TimeIntervalComponent, TimePipe ],
    });

    fixture = TestBed.createComponent(TimeIntervalComponent);

    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  });

  it('should exists', () => {
    expect(el.textContent).toContain('Time interval');
  });
});
