import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarControlComponent } from './event-calendar-control.component';

describe('EventCalendarControlComponent', () => {
  let component: EventCalendarControlComponent;
  let fixture: ComponentFixture<EventCalendarControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCalendarControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCalendarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
