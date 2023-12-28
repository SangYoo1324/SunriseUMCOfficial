import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMarkComponent } from './loading-mark.component';

describe('LoadingMarkComponent', () => {
  let component: LoadingMarkComponent;
  let fixture: ComponentFixture<LoadingMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingMarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
