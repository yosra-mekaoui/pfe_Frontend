import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletravailComponent } from './teletravail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeletravailComponent', () => {
  let component: TeletravailComponent;
  let fixture: ComponentFixture<TeletravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [TeletravailComponent]
    });
    fixture = TestBed.createComponent(TeletravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
