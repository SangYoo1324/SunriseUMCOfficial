import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsBubbleDetailComponent } from './contents-bubble-detail.component';

describe('ContentsBubbleDetailComponent', () => {
  let component: ContentsBubbleDetailComponent;
  let fixture: ComponentFixture<ContentsBubbleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsBubbleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsBubbleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
