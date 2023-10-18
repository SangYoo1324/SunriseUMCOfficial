import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsInfoComponent } from './visitors-info.component';

describe('VisitorsInfoComponent', () => {
  let component: VisitorsInfoComponent;
  let fixture: ComponentFixture<VisitorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
