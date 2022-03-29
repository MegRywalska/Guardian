import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavigatorComponent } from './header-navigator.component';

describe('HeaderNavigatorComponent', () => {
  let component: HeaderNavigatorComponent;
  let fixture: ComponentFixture<HeaderNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
