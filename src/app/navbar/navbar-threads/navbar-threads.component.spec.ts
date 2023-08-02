import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarThreadsComponent } from './navbar-threads.component';

describe('NavbarThreadsComponent', () => {
  let component: NavbarThreadsComponent;
  let fixture: ComponentFixture<NavbarThreadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarThreadsComponent]
    });
    fixture = TestBed.createComponent(NavbarThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
