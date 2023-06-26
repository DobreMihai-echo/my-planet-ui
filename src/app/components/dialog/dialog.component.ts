import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Marker } from '../events/marker.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input() onSave: (description: string)=>void;

  myData: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Marker) {}

  profileForm = this.formBuilder.group({
    description: [this.data?.description ? this.data.description:''],
    date: [this.data?.date ? this.data.date:''],
    type: [this.data?.type ? this.data.type:'']

  })
  
    closeForm(): void {
    this.dialogRef.close({data: false, myData: null});
  }

  saveForm(): void {
    console.log(this.profileForm.value);
    this.dialogRef.close({data: true, myData: this.profileForm.value});
  }
}
