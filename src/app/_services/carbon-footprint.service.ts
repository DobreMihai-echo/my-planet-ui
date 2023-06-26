import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarbonFootprint } from '../components/charts/carbon.interface';


@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {

  constructor(private http:HttpClient) { }

  getCarbonFootprintForUser(username:string) {
    const reqParams = {
      "username": username
    }
    return this.http.get<CarbonFootprint[]>(`http://localhost:8086/api/carbon-footprint`,{params:reqParams});
  }

  postCarbonFootprint(carbon:CarbonFootprint, username:string) {
    const reqParams = {
      "username": username
    }
    return this.http.post(`http://localhost:8086/api/carbon-footprint`,carbon,{params:reqParams});
  }
}
