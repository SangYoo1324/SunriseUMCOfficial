import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEventControlComponent } from './photo-event-control.component';

describe('PhotoEventControlComponent', () => {
  let component: PhotoEventControlComponent;
  let fixture: ComponentFixture<PhotoEventControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoEventControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoEventControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
