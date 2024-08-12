import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListComponent } from './backlog-list.component';

describe('BacklogListComponent', () => {
  let component: BacklogListComponent;
  let fixture: ComponentFixture<BacklogListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListComponent]
    });
    fixture = TestBed.createComponent(BacklogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
