import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { CarbonFootprintService } from 'src/app/_services/carbon-footprint.service';
import { CarbonFootprint } from '../charts/carbon.interface';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.css']
})
export class CarbonFootprintComponent implements OnInit {
  
  @ViewChild('severityElement', { static: false }) severityElement: ElementRef;
  @ViewChild('carSelect') carSelect: MatSelect;
  @ViewChild('transitSelect') transitSelect:MatSelect;
  @ViewChild('energySelect') energySelect:MatSelect;
  @ViewChild('fuelSelect') fuelSelect:MatSelect;
  @ViewChild('flightSelect') flightSelect:MatSelect;

  treeKillElem : number = 0;
  transitData: number=0;
  carbonF:number = 0;
  carForm = new FormGroup({
    car: new FormControl(''),
    distance: new FormControl('')
  });

  carEmission : number = 0;
  transitEmission: number = 0;
  planeEmission : number = 0;
  energyEmission : number = 0;
  foodEmission : number = 0;
  fuelEmission : number = 0;

  constructor(private http:HttpClient, private carbonService: CarbonFootprintService, private authService: AuthService){
  }
  ngOnInit(): void {

  }

  save() {
    const currentDate = new Date();
    let carbonBuild:CarbonFootprint = {
      carEmissionCo2 : this.carEmission == 0 ? this.carEmission : parseFloat(this.carEmission.toFixed(3)),
      transitEmissionCo2: this.transitEmission == 0 ? this.transitEmission : parseFloat(this.transitEmission.toFixed(3)),
      planeEmissionCo2 : this.planeEmission == 0 ? this.planeEmission : parseFloat(this.planeEmission.toFixed(3)),
      energyEmissionCo2 : this.energyEmission == 0 ? this.energyEmission : parseFloat(this.energyEmission.toFixed(3)),
      foodEmissionCo2 : this.foodEmission == 0 ? this.foodEmission : parseFloat(this.foodEmission.toFixed(3)),
      fuelEmissionCo2 : this.fuelEmission == 0 ? this.fuelEmission : parseFloat(this.fuelEmission.toFixed(3)),
      totalEmissionCo2 : parseFloat(this.carbonF.toFixed(3)),
      killedTrees : parseFloat(this.treeKillElem.toFixed(3)),
      totalOffset : 0,
      date: currentDate.toLocaleDateString('en-GB')
    }
    this.carbonService.postCarbonFootprint(carbonBuild,this.authService.getAuthUsername());
  }
  
  car(){
    const car = this.carSelect.value;
    let distance =(0 + parseFloat((document.getElementById('cdist') as HTMLInputElement).value));

  if (distance < 0 || distance == null) {
    return;
  } 

  const headers = new HttpHeaders({
    'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
    'x-rapidapi-key': '0d07d14023msh6bc62a5f8b901d1p1d6eb5jsn1c4dace0be1f'
  });

  this.http.get<any>(
    `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=${car}&distance=${distance}`,
    { headers }
  ).subscribe(
    (response: any) => {
      console.log(response);
      this.carEmission+=response.carbonEquivalent;
      this.carbonF = response.carbonEquivalent + this.carbonF;
      this.treeCalc();
      this.severity('cdist', 0.575576, 0.285,'asdf');
    },
    (error: any) => {
      console.log(error);
    }
  );  
  }

  treeCalc() {
    const treeWeight = 1000; 
    const treeDMass = treeWeight / 2;
    const treeAge = 20; 
    const treeCarb = treeDMass * 0.475;
    const treeCO2 = treeCarb * 3.67;
    const treeDie = treeCO2 / treeAge;
    const numOfTreesD = this.carbonF / treeDie;
    this.treeKillElem = this.treeKillElem + numOfTreesD;
  }
  
  severity(id: string, maxNum: number, minNum: number, responseText: string) {
    const cf = parseFloat(responseText);
    const d = this.carForm.get(id)?.value || 0;
    const max = maxNum * d;
    const min = minNum * d;
    const maxDif = max - cf;
    const minDif = cf - min;
    const mid = (maxDif + minDif) / 2;
    const midDif = mid - cf;
    let severity = '';
  
    if (maxDif < minDif) {
      if (maxDif < midDif) {
        severity = 'High';
      } else {
        severity = 'Medium High';
      }
    } else if (minDif < maxDif) {
      if (minDif < midDif) {
        severity = 'Low';
      } else {
        severity = 'Medium Low';
      }
    } else {
      severity = 'Medium';
    }
  
    console.log(severity);
    this.severityElement.nativeElement.innerHTML = severity;
  }

  reset() {
    console.log("RESET")
  }

  fuel() {
    let fuel = this.fuelSelect.value;
    let distance =parseFloat((document.getElementById('litre') as HTMLInputElement).value);

  if (distance < 0 || distance == null) {
    this.carbonF = 0 + this.carbonF;
    return;
  } 

  const headers = new HttpHeaders({
    'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
    'x-rapidapi-key': '0d07d14023msh6bc62a5f8b901d1p1d6eb5jsn1c4dace0be1f'
  });

  this.http.get<any>(
    `https://carbonfootprint1.p.rapidapi.com/FuelToCO2e?litres=${distance}&type=${fuel}`,
    { headers }
  ).subscribe(
    (response: any) => {
      console.log(response);
      this.fuelEmission += response.carbonEquivalent;
      this.carbonF = response.carbonEquivalent + this.carbonF;
      this.treeCalc();
      this.severity('litre', 4.31212, 2.42959,response.carbonEquivalent);
    },
    (error: any) => {
      console.log(error);
    }
  );  
  }

  food() {
    let food = (document.getElementById('ftype') as HTMLInputElement).value;
    let cal = parseFloat((document.getElementById('cal') as HTMLInputElement).value);
    let foodData = 0;
    console.log(food+cal)
    if (food == 'd'){
      foodData = 2.2;
    }
    else if (food == 'ss'){
      foodData = 0.6;
    }
    else if (food == 'os'){
      foodData = 0.8;
    }
    else if (food == 'f'){
      foodData = 4.6;
    }
    else if (food == 'v'){
      foodData = 2.8;
    }
    else if (food == 'cb'){
      foodData = 1.3;
    }
    else if (food == 'd'){
      foodData = 4.5;
    }
    else if (food == 'cfp'){
      foodData = 3.8;
    }  
    else if (food == 'bl'){
      foodData = 14.1;
    }
    let kg = (foodData * cal / 1000000);
    this.foodEmission += kg;
    this.carbonF = this.carbonF + kg;
    this.treeCalc();
    this.severity('cal', 0.0141, 0.0006, ""+ kg)
  }

  energy() {
    let energy = this.energySelect.value;
    let distance =parseFloat((document.getElementById('edist') as HTMLInputElement).value);
    console.log(energy + distance);

    if (distance < 0 || distance == null) {
        this.carbonF = 0 + this.carbonF;
        return; 
    }

    const data = null;

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
      'x-rapidapi-key': '0d07d14023msh6bc62a5f8b901d1p1d6eb5jsn1c4dace0be1f'
    });
  
    this.http.get<any>(
      `https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint?consumption=${distance}&energy=${energy}`,
      { headers }
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.carbonF = response.carbonEquivalent + this.carbonF;
        this.energyEmission+= response.carbonEquivalent;
        this.treeCalc();
        this.severity('edist', 0.061, 0.008,response.carbonEquivalent);
      },
      (error: any) => {
        console.log(error);
      }
    );  
  }

  flight() {
    let flight = this.flightSelect.value
    let distance = parseFloat((document.getElementById('fdist') as HTMLInputElement).value);
    console.log(flight + distance);

    if (distance < 0 || distance == null) {
        this.carbonF = 0 + this.carbonF;
        return; 
    }

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
      'x-rapidapi-key': '0d07d14023msh6bc62a5f8b901d1p1d6eb5jsn1c4dace0be1f'
    });
  
    this.http.get<any>(
      `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight?type=${flight}&distance=${distance}`,
      { headers }
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.carbonF = response.carbonEquivalent + this.carbonF;
        this.planeEmission+=response.carbonEquivalent;
        this.treeCalc();
        this.severity('fdist', 0.6175, 0.1545,response.carbonEquivalent);
      },
      (error: any) => {
        console.log(error);
      }
    );  
  }

  transit(){

    const transit = this.transitSelect.value;
    let distance =(0 + parseFloat((document.getElementById('tdist') as HTMLInputElement).value));
    console.log(transit + distance);

    if (distance < 0 || distance == null) {
        this.carbonF = 0 + this.carbonF;
        return; 
    }

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
      'x-rapidapi-key': '0d07d14023msh6bc62a5f8b901d1p1d6eb5jsn1c4dace0be1f'
    });
  
    this.http.get<any>(
      `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit?type==${transit}&distance=${distance}`,
      { headers }
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.carbonF = response.carbonEquivalent + this.carbonF;
        this.transitEmission+=response.carbonEquivalent;
        this.treeCalc();
        this.severity('tdist', 0.575576, 0.285,response.carbonEquivalent);
      },
      (error: any) => {
        console.log(error);
      }
    );  
}

}
