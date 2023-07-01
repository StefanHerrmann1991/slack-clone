import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMessagesComponent } from './dashboard-messages.component';

describe('DashboardMessagesComponent', () => {
  let component: DashboardMessagesComponent;
  let fixture: ComponentFixture<DashboardMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMessagesComponent]
    });
    fixture = TestBed.createComponent(DashboardMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
