import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMadeComponent } from './vehicle-made.component';

describe('VehicleMadeComponent', () => {
  let component: VehicleMadeComponent;
  let fixture: ComponentFixture<VehicleMadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
