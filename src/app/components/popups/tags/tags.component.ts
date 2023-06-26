import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tagFormGroup: FormGroup;

	constructor(
		private thisDialogRef: MatDialogRef<TagsComponent>,
		private formBuilder: FormBuilder) { }

	get name() { return this.tagFormGroup.get('name'); } 

	ngOnInit(): void {
		this.tagFormGroup = this.formBuilder.group({
			name: new FormControl('', [Validators.minLength(3), Validators.maxLength(64)])
		});
	}

	addTag(e: Event): void {
		e.preventDefault();
		this.thisDialogRef.close({tagName: this.name!.value});
		this.tagFormGroup.reset();
		Object.keys(this.tagFormGroup.controls).forEach(key => {
			this.tagFormGroup.get(key)!.setErrors(null) ;
		});
	}
}
