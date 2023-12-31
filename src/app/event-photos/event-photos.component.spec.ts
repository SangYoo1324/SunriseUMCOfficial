import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotosComponent } from './event-photos.component';

describe('EventPhotosComponent', () => {
  let component: EventPhotosComponent;
  let fixture: ComponentFixture<EventPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
