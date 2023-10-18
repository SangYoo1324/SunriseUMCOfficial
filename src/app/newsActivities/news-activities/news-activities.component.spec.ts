import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsActivitiesComponent } from './news-activities.component';

describe('NewsActivitiesComponent', () => {
  let component: NewsActivitiesComponent;
  let fixture: ComponentFixture<NewsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
