import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInviteCollegueDialogComponent } from './navbar-invite-collegue-dialog.component';

describe('NavbarInviteCollegueDialogComponent', () => {
  let component: NavbarInviteCollegueDialogComponent;
  let fixture: ComponentFixture<NavbarInviteCollegueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarInviteCollegueDialogComponent]
    });
    fixture = TestBed.createComponent(NavbarInviteCollegueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
