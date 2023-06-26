import { Component, Input } from '@angular/core';
import { Challenge } from '../plan/challenge.interface';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent {

  constructor(private sharedService: SharedService){}

  @Input() challenge:Challenge;

  complete() {
    this.sharedService.deleteItem(this.challenge);
    
  }
}
