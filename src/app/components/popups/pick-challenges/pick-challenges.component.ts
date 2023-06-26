import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import axios from 'axios';
import { Challenge } from '../../plan/challenge.interface';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PickChallengesService } from '../pick-challenges.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateChallengeComponent } from '../create-challenge/create-challenge.component';
import { AuthService } from 'src/app/_services/auth.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-pick-challenges',
  templateUrl: './pick-challenges.component.html',
  styleUrls: ['./pick-challenges.component.css']
})
export class PickChallengesComponent {
  todo:any=[];

  currentPage = 1;
  startIndex = 1;
  endIndex = 4;  // Display the first 9 items
  itemsPerPage = 4;
  done:Challenge[] = [];
  paginatedDone:Challenge[]=[];

  items:any=[]

  constructor(public dialogRef: MatDialogRef<PickChallengesComponent>, public service:PickChallengesService, public dialog: MatDialog, public auth:AuthService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateChallengeComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllChallenges();
    });
  }
  ngOnInit(): void {
    this.getAllChallenges();
    this.getAllOngoingChallenges();

    const itemsState = this.service.getItemsState();
    if (itemsState.length > 0) {
      this.items = itemsState;
    }
  }

  getAllChallenges() {
    let reqParams = {
      username: this.auth.getAuthUsername()
    }
    return axios.get<Challenge[]>(`http://localhost:8070/api/challenge/all`,{params:reqParams}).then(data=>{
      this.done = data.data.sort(a => a.id);
      this.paginatedDone = this.getItemsForPage();
    });
  }

  getAllOngoingChallenges() {
    let reqParams = {
      username: this.auth.getAuthUsername()
    }

    return axios.get<Challenge[]>(`http://localhost:8070/api/challenge/ongoing`,{params:reqParams}).then(data=>{
      console.log("ONGOING", data);
      this.todo = data.data;
      console.log("TODO", this.todo);
    })
  }

  next() {
    this.currentPage = this.currentPage + 1
    this.paginatedDone = this.getItemsForPage();
  }

  prev() {
    this.currentPage = this.currentPage - 1
    this.paginatedDone = this.getItemsForPage();
  }

  drop(event: CdkDragDrop<Challenge[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if(this.done.includes(event.item.data)) {
        this.done = this.done.filter(obj=> obj !== event.item.data);
      } else {
        this.done = [...this.done,event.item.data];
      }
      this.done.sort(a=> a.id);
      this.paginatedDone = this.getItemsForPage();
    }
  }

  getItemsForPage(): any[] {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    return this.done.slice(this.startIndex, this.endIndex);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCard() {
    const params = {
      username: 'test'
    }
    console.log(this.todo);
    let challengesId = this.todo.map(challenge => challenge.id);
    return axios.put(`http://localhost:8070/api/challenge/join`,challengesId,{params: params}).then(data=>{
      console.log("CHALLENGE",data)
      this.dialogRef.close();
    });
  }
}
