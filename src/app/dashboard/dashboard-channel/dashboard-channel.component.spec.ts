import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardChannelComponent } from './dashboard-channel.component';

describe('DashboardChannelComponent', () => {
  let component: DashboardChannelComponent;
  let fixture: ComponentFixture<DashboardChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardChannelComponent]
    });
    fixture = TestBed.createComponent(DashboardChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
