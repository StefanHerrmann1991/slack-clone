import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNewChannelDialogComponent } from './navbar-new-channel-dialog.component';

describe('NavbarNewChannelDialogComponent', () => {
  let component: NavbarNewChannelDialogComponent;
  let fixture: ComponentFixture<NavbarNewChannelDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarNewChannelDialogComponent]
    });
    fixture = TestBed.createComponent(NavbarNewChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
