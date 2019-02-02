import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleVariantComponent } from './vehicle-variant.component';

describe('VehicleVariantComponent', () => {
  let component: VehicleVariantComponent;
  let fixture: ComponentFixture<VehicleVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
