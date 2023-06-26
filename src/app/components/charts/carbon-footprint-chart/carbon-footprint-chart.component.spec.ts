import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { CarbonFootprintChartComponent } from './carbon-footprint-chart.component';

describe('CarbonFootprintChartComponent', () => {
  let component: CarbonFootprintChartComponent;
  let fixture: ComponentFixture<CarbonFootprintChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonFootprintChartComponent ],
      imports: [ NgChartsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonFootprintChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
