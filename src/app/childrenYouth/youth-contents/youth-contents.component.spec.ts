import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthContentsComponent } from './youth-contents.component';

describe('YouthContentsComponent', () => {
  let component: YouthContentsComponent;
  let fixture: ComponentFixture<YouthContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouthContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouthContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
