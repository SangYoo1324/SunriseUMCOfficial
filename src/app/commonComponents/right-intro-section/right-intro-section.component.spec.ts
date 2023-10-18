import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightIntroSectionComponent } from './right-intro-section.component';

describe('RightIntroSectionComponent', () => {
  let component: RightIntroSectionComponent;
  let fixture: ComponentFixture<RightIntroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightIntroSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightIntroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
