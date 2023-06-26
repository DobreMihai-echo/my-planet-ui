import { EventEmitter, Injectable } from '@angular/core';
import { Challenge } from '../components/plan/challenge.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedLoginOverlay: EventEmitter<boolean> = new EventEmitter<boolean>();

  challenges$ = new Subject<Challenge>;

  deleteItem(challenge: Challenge) {
    this.challenges$.next(challenge);
  }
  constructor() { }
}
