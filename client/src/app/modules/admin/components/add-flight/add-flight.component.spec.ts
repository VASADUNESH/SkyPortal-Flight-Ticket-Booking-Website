import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightComponent } from './add-flight.component';

describe('AddFlightComponent', () => {
  let component: AddFlightComponent;
  let fixture: ComponentFixture<AddFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlightComponent]
    });
    fixture = TestBed.createComponent(AddFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
