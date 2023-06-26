import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { SharedService } from 'src/app/_services/shared.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isActive = false;
  isLight = false;
  constructor(private dataS:DataService, private sharedService: SharedService, public auth: AuthService) { }

  ngOnInit(): void {
    // this.dataS.getUser().subscribe(info => {
    //   console.log("MY INFO:" + info);
    // })
  }

  toggleSidebar() {
    this.isActive = !this.isActive
  }

  setLight(value: boolean) {
    this.isLight = true;
  }

  showLoginComponent() {
    this.sharedService.sharedLoginOverlay.emit(true);
  }

  handleLogout() {
    console.log("CLSDSFFSD")
    this.auth.logout();
  }

}
