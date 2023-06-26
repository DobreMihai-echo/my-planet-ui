import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickChallengesService {

  constructor() { }

  private itemsState: any[] = [];

  setItemsState(items: any[]): void {
    this.itemsState = items;
  }

  getItemsState(): any[] {
    return this.itemsState;
  }
}
