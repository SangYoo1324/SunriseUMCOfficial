import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsBubbleComponent } from './contents-bubble.component';

describe('ContentsBubbleComponent', () => {
  let component: ContentsBubbleComponent;
  let fixture: ComponentFixture<ContentsBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsBubbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
