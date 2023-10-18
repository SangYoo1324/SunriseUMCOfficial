import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonArchiveComponent } from './sermon-archive.component';

describe('SermonArchiveComponent', () => {
  let component: SermonArchiveComponent;
  let fixture: ComponentFixture<SermonArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SermonArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SermonArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
