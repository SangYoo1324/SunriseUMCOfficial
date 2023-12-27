import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariousContentsComponent } from './various-contents.component';

describe('VariousContentsComponent', () => {
  let component: VariousContentsComponent;
  let fixture: ComponentFixture<VariousContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariousContentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariousContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
