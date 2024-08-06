import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshAnimationComponent } from './refresh-animation.component';

describe('RefreshAnimationComponent', () => {
  let component: RefreshAnimationComponent;
  let fixture: ComponentFixture<RefreshAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreshAnimationComponent]
    });
    fixture = TestBed.createComponent(RefreshAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
