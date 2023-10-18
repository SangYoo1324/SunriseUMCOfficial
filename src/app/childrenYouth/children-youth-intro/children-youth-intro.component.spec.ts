import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenYouthIntroComponent } from './children-youth-intro.component';

describe('ChildrenYouthIntroComponent', () => {
  let component: ChildrenYouthIntroComponent;
  let fixture: ComponentFixture<ChildrenYouthIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenYouthIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenYouthIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
