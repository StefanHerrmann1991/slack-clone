import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarChannelComponent } from './navbar-channel.component';

describe('NavbarChannelComponent', () => {
  let component: NavbarChannelComponent;
  let fixture: ComponentFixture<NavbarChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarChannelComponent]
    });
    fixture = TestBed.createComponent(NavbarChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
