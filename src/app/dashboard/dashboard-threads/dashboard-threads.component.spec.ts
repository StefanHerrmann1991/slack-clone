import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardThreadsComponent } from './dashboard-threads.component';

describe('DashboardThreadsComponent', () => {
  let component: DashboardThreadsComponent;
  let fixture: ComponentFixture<DashboardThreadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardThreadsComponent]
    });
    fixture = TestBed.createComponent(DashboardThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
