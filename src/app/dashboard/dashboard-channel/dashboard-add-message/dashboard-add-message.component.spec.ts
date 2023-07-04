import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddMessageComponent } from './dashboard-add-message.component';

describe('DashboardNewChannelDialogComponent', () => {
  let component: DashboardAddMessageComponent;
  let fixture: ComponentFixture<DashboardAddMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAddMessageComponent]
    });
    fixture = TestBed.createComponent(DashboardAddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
