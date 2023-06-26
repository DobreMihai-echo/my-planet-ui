import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent {

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateChallengeComponent>, private matDialog: MatDialog){}

  title:string;
  postTags: any[] = [];
  points:number;
  mycolor:string="#fff";
  description: string;
  createChallengeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required]],
    points: ['',[Validators.required]],
    mycolor: [this.mycolor, [Validators.required]]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const { title, description, points, mycolor } = this.createChallengeForm.value;
    const params = {
      username: 'test'
    }
    console.log(this.postTags)
    const obj = {
      title: this.title,
      description: this.description,
      creator: 'test',
      level: 'Easy',
      points: 30,
      color: '',
      challengeTags: this.postTags
    }
    console.log("TAGS",obj);

    if(title!==null && title!==undefined && description !== null && description !== undefined && points!==null && points!==undefined && mycolor!==null && mycolor!==undefined) {
      axios.post(`http://localhost:8070/api/challenge`,obj).then(data=>{
        console.log("DATA SENT",data)
        this.dialogRef.close();
    });
    }
  }

  openAddTagDialog(e: Event): void {
		e.preventDefault();

		const dialogRef = this.matDialog.open(TagsComponent, {
			width: '500px',
			autoFocus: true
		});

		dialogRef.afterClosed().subscribe(
			result => {
				if (result) {
					const tagIndex = this.postTags.findIndex(tN => tN === result.tagName);
					if (tagIndex >= 0) {
						this.postTags[tagIndex].action = 'add'
					} else {
						this.postTags.push({
							tagName: result.tagName,
							action: 'add'
						})
					}
				}
				console.log(this.postTags)
			}
		);
	}
}
