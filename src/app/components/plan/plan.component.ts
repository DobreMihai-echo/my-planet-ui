import { CdkDragDrop,moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Challenge } from './challenge.interface';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { da } from 'date-fns/locale';
import { PickChallengesComponent } from '../popups/pick-challenges/pick-challenges.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateChallengeComponent } from '../popups/create-challenge/create-challenge.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{

  

  todo:any=[];

  constructor(public dialog: MatDialog){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PickChallengesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateChallengeComponent);
    dialogRef.afterClosed().subscribe(rs => {
      console.log("HELLOOOO GOTHAM");
    })
  }
  ngOnInit(): void {
    this.getAllChallenges();
  }

  getAllChallenges() {
    return axios.get<Challenge[]>(`http://localhost:8070/api/challenge/all`).then(data=>{
      console.log("CHALLENGE",data)
      this.todo = data.data;
    });
  }


  // todo:Challenge[] = [
  //   {
  //     id:1,
  //     points: 20,
  //     title: 'Title 1',
  //     description: 'Desc 1',
  //     creator: 'test123',
  //     level: 'East'
  //   },
  //   {
  //     id:2,
  //     points: 20,
  //     title: 'Title 2',
  //     description: 'Desc 2',
  //     creator: 'test123',
  //     level: 'East'
  //   },
  //   {
  //     id:3,
  //     points: 20,
  //     title: 'Title 3',
  //     description: 'Desc 3',
  //     creator: 'test123',
  //     level: 'Hard'
  //   },
  //   {
  //     id:4,
  //     points: 20,
  //     title: 'Title 4',
  //     description: 'Desc 4',
  //     creator: 'test123',
  //     level: 'East'
  //   }
  // ];

  done:Challenge[] = [];

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
    }
  }

  sendData() {
    const params = {
      username: 'test'
    }
    console.log(this.todo);
    return axios.post(`http://localhost:8086/api/user-chalenge`,this.todo,{params: params}).then(data=>{
      console.log("CHALLENGE",data)
    });
  }
}
