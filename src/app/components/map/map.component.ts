import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Marker } from '../events/marker.interface';
import { MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';
import axios from 'axios';
import { SharedService } from 'src/app/_services/shared.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MarkerService } from 'src/app/_services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChildren(MapInfoWindow) infoWindow: QueryList<MapInfoWindow>;
  showLogin:boolean=false;
  showRegister:boolean=false;
  markers:Marker[]= new Array();
  currentLocation: google.maps.LatLngLiteral;

  constructor(private dialog: MatDialog, private markerService:MarkerService, private sharedService: SharedService, public auth:AuthService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.getAllMarkers();
    this.sharedService.sharedLoginOverlay.subscribe((show:boolean) => {
      this.showLogin = show;
    })
  }

  getAllMarkers() {
    return this.markerService.getAllMarkers().subscribe(data=>{
      this.markers = data;
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(this.auth.getAuthUsername()!=undefined || this.auth.getAuthUsername()!=null) {
      const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    if(result.data) {
      if(event.latLng) {
        const position = event.latLng.toJSON();
        const createdMarker:Marker = {
          id: 0,
          latitude: position.lat,
          longitude: position.lng,
          username: this.auth.getAuthUsername(),
          type: result.myData.type,
          description: result.myData.description,
          date: result.myData.date,
          eventJoiners:[]
        }
        this.markerService.postEvent(createdMarker).subscribe((data)=> {
          this.markers = data;
        });
      }
    }
  });
    }
  }

  openInfoWindow(marker: any, index: number) {
    let curIdx = 0;
    this.infoWindow.forEach((window: MapInfoWindow)=> {
      if(index===curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
      }
    })
  }

  toggleForm(form: string) {
    if(form==='login') {
      this.showLogin = !this.showLogin;
      this.showRegister = false;
    } else if(form ==='register') {
      this.showRegister= !this.showRegister;
      this.showLogin = false;
    }
  }

  switchToRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  switchToLogin() {
    this.showLogin = true;
    this.showRegister = false;
  }

  onDeleteMarker(markerId:number) {
    console.log("RECEIVED:" + markerId);
    return this.markerService.deleteMarker(markerId).subscribe(data=>{
      this.markers = data;
    });
  }

  onUpdateMarker(event: {markerId:number, markerUpdate: Marker}) {
    console.log("UPDATE",event.markerId,event.markerUpdate);
    this.markerService.updateMarker(event.markerId,event.markerUpdate).subscribe(data=>{
      this.markers = data;
    })
   
  }
}
