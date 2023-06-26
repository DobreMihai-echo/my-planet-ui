import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBySideChartComponent } from './side-by-side-chart.component';

describe('SideBySideChartComponent', () => {
  let component: SideBySideChartComponent;
  let fixture: ComponentFixture<SideBySideChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBySideChartComponent]
    });
    fixture = TestBed.createComponent(SideBySideChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
