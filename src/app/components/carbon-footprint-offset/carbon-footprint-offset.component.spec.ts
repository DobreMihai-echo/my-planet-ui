import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintOffsetComponent } from './carbon-footprint-offset.component';

describe('CarbonFootprintOffsetComponent', () => {
  let component: CarbonFootprintOffsetComponent;
  let fixture: ComponentFixture<CarbonFootprintOffsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarbonFootprintOffsetComponent]
    });
    fixture = TestBed.createComponent(CarbonFootprintOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
