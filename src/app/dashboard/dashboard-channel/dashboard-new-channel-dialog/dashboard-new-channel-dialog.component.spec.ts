import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewChannelDialogComponent } from './dashboard-new-channel-dialog.component';

describe('DashboardNewChannelDialogComponent', () => {
  let component: DashboardNewChannelDialogComponent;
  let fixture: ComponentFixture<DashboardNewChannelDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNewChannelDialogComponent]
    });
    fixture = TestBed.createComponent(DashboardNewChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
