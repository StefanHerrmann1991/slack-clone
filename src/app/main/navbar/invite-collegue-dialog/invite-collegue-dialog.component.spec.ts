import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCollegueDialogComponent } from './invite-collegue-dialog.component';

describe('InviteCollegueDialogComponent', () => {
  let component: InviteCollegueDialogComponent;
  let fixture: ComponentFixture<InviteCollegueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteCollegueDialogComponent]
    });
    fixture = TestBed.createComponent(InviteCollegueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
