import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourOrderComponent } from './tour-order.component';

describe('TourOrderComponent', () => {
  let component: TourOrderComponent;
  let fixture: ComponentFixture<TourOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
