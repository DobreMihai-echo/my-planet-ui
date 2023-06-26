import { Component } from '@angular/core';

@Component({
  selector: 'app-carbon-footprint-offset',
  templateUrl: './carbon-footprint-offset.component.html',
  styleUrls: ['./carbon-footprint-offset.component.css']
})
export class CarbonFootprintOffsetComponent {
  offset: number = 0;
  led: number = 0;
  ledYears: number = 0;
  heatingYears: number = 0;
  thriftYears: number = 0;
  renew: number = 0;
  vegYears: number = 0;
  electricYears: number = 0;
  ledImpact() {
    if (this.led && this.ledYears) {
      console.log("LED",this.led);
      const totalBulbsPerYear = this.led * this.ledYears;
      this.offset += totalBulbsPerYear * 1836.596;
      this.ledYears *= 2;
    }
  }

  heating() {
    if (this.heatingYears.toString() !== '') {
      this.offset += this.heatingYears * 4672.00150001;
      this.heatingYears *= 2;
    }
  }

  thrift() {
    if (this.thriftYears.toString() !== '') {
      this.offset += this.thriftYears * 748;
      this.thriftYears *= 2;
    }
  }

  renewImpact() {
    if (this.renew.toString() !== '') {
      this.offset += this.renew * 8979.17;
      this.renew *= 2;
    }
  }

  vegImpact() {
    if (this.vegYears.toString() !== '') {
      this.offset += this.vegYears * 907.185;
      this.vegYears *= 2;
    }
  }

  electricImpact() {
    if (this.electricYears.toString() !== '') {
      this.offset += this.electricYears * 2773.05;
      this.electricYears *= 2;
    }
  }

  resetOffset() {
    this.offset = 0;
  }
}
