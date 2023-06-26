import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marker } from './marker.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../profile/user';
import { UserService } from 'src/app/_services/user.service';
import { MarkerService } from 'src/app/_services/marker.service';
import { da } from 'date-fns/locale';
import { ReplyComponent } from '../popups/reply/reply.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  @Input() marker: Marker;
  @Output() delete = new EventEmitter<number>();
  @Output() update : EventEmitter<{markerId: number, markerUpdate: Marker}> = new EventEmitter<{markerId: number, markerUpdate: Marker}>();
  markerCreator: User;
  eventJoiners:User[] = new Array();
  eventJoinersUsername: string[] = new Array();

  constructor(public auth: AuthService, private dialog: MatDialog, private userService: UserService, private markerService: MarkerService) {
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    stagePadding: 1,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText:['',''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 12
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this.userService.getUserByUsername(this.marker.username).subscribe(data=>{
      this.markerCreator = data;
      console.log(this.markerCreator.username);
    });

    console.log("IN NG ON INIT");

    console.log("EVENT JOINERS ON MARKER FOR:" + this.marker.username + this.marker.eventJoiners);
    this.eventJoinersUsername = this.marker.eventJoiners;
    console.log("MY USERNAMES:",this.eventJoinersUsername)
    this.userService.getUsersByListOfUsernames(this.marker.eventJoiners);
    if(this.eventJoinersUsername.length > 0) {
      this.getJoiners();
    }
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  join(markerId:number) {
    console.log("clicked",markerId);
    this.markerService.joinEvent(markerId, this.auth.getAuthUsername()).subscribe(data=> {
      console.log("DATA",data);
      this.eventJoinersUsername = data; 
      this.getJoiners();
    });
  }

  getJoiners() {
    console.log("EVENT USERNAMES:...", this.eventJoinersUsername)
    this.userService.getUsersByListOfUsernames(this.eventJoinersUsername).subscribe(data=>{
      console.log("DATA JOIN:", data);
      this.eventJoiners = data;
      this.customOptions.loop = this.eventJoiners.length > 1;
      console.log("DATA EVENT:",this.eventJoiners)
    })
  }

  comments(markerId:number) {
    console.log("clicked",markerId);

    this.dialog.open(ReplyComponent,{data: this.marker.id});
  }

  share(markerId:number) {
    console.log("clicked",markerId);
  }

  deleteMarker(markerId:number) {
    this.delete.emit(markerId);
  }

  updateMarker(markerId:number) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data: this.marker
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("RES:",result)
        if(result.data) {
          console.log("MY DATA:",result.myData)
          this.update.emit({markerId: markerId, markerUpdate: result.myData});
        }
    })
  }

  unjoin(markerid: number) {
    this.markerService.unjoinEvent(markerid,this.getAuthUser().username).subscribe(data=>{
      this.eventJoinersUsername = data;
      this.getJoiners();
    })
  }


  getAuthUser() {
    return this.auth.getAuthUserFromCache();
  }

  isAuthUser(username: string) {
    const authUser = this.getAuthUser();
    return authUser && authUser.username === username;
  }

  isJoiner() {
    const username = this.auth.getAuthUsername();
    return this.eventJoiners.some(joiner => joiner.username === username);
  }

}
