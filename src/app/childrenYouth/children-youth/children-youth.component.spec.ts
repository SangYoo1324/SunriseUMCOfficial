import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenYouthComponent } from './children-youth.component';

describe('ChildrenYouthComponent', () => {
  let component: ChildrenYouthComponent;
  let fixture: ComponentFixture<ChildrenYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenYouthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
