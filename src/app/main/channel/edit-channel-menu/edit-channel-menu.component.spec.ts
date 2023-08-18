import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelMenuComponent } from './edit-channel-menu.component';

describe('EditChannelMenuComponent', () => {
  let component: EditChannelMenuComponent;
  let fixture: ComponentFixture<EditChannelMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChannelMenuComponent]
    });
    fixture = TestBed.createComponent(EditChannelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
