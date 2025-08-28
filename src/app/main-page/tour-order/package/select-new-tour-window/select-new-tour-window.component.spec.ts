import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNewTourWindowComponent } from './select-new-tour-window.component';

describe('SelectNewTourWindowComponent', () => {
  let component: SelectNewTourWindowComponent;
  let fixture: ComponentFixture<SelectNewTourWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectNewTourWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectNewTourWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
