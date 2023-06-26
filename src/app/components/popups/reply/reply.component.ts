import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { MarkerService } from 'src/app/_services/marker.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { AppConstants } from 'src/app/models/user-response/app-constants';
import { ReplyResponse } from "./comment.interface";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {

  // constructor(@Inject(MAT_DIALOG_DATA) private markerId: number, private http: HttpClient){}

  @Output() updatedCommentCountEvent = new EventEmitter<number>();
	@Output() newItemEvent = new EventEmitter<string>();
	authUserId: number;
	comments: ReplyResponse[] = [];
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = false;
	fetchingResult: boolean = false;
	creatingComment: boolean = false;
	commentFormGroup: FormGroup;
	defaultProfilePhotoUrl = 'http://localhost:8085/assets/woman-user.svg';

	private subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthService,
		private markerService: MarkerService,
		private formBuilder: FormBuilder,
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar) { }
	
	get content() { return this.commentFormGroup.get('content') }

	ngOnInit(): void {
		this.commentFormGroup = this.formBuilder.group({
			content: new FormControl('', [Validators.required, Validators.maxLength(1024)])
		});

    console.log("BEFORE LOAD COMMENTS");
		this.loadComments(1);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadComments(currentPage: number): void {
    console.log("INSIDE LAOD COMMENTS");

    this.markerService.getEventComments(this.data, 1, 20).subscribe(comments=>{
      console.log("COMMENTS:",comments);
      this.comments = comments;
    })
		if (!this.fetchingResult) {
			if (this.data.commentCount > 0) {
				this.fetchingResult = true;
				this.markerService.getEventComments(this.data, 1, 20).subscribe(
            
          (resultList: ReplyResponse[]) => {
            console.log("INSIDE METHOD");
            resultList.forEach(commentResponse => this.comments.push(commentResponse));
            if (currentPage * this.resultSize < this.data.commentCount) {
              this.hasMoreResult = true;
            } else {
              this.hasMoreResult = false;
            }
            this.resultPage++;
            this.fetchingResult = false;
          },
          (errorResponse: HttpErrorResponse) => {
            this.matSnackbar.openFromComponent(SnackbarComponent, {
              data: AppConstants.snackbarErrorContent,
              panelClass: ['bg-danger'],
              duration: 5000
            });
            this.fetchingResult = false;
          }
        )
			} 
		}
	}

	createNewComment(commentInput: HTMLInputElement): void {
		this.creatingComment = true;
		this.subscriptions.push(
			this.markerService.createEventComment(this.data, commentInput.value, this.authService.getAuthUsername()).subscribe(
				(newComment: ReplyResponse) => {
					this.commentFormGroup.reset();
					Object.keys(this.commentFormGroup.controls).forEach(key => {
						this.commentFormGroup.get(key)!.setErrors(null) ;
					});
					this.comments.unshift(newComment);
					this.updatedCommentCountEvent.emit(this.comments.length);
					this.creatingComment = false;
				},
				(errorResponse: HttpErrorResponse) => {
					this.matSnackbar.openFromComponent(SnackbarComponent, {
						data: AppConstants.snackbarErrorContent,
						panelClass: ['bg-danger'],
						duration: 5000
					});
					this.creatingComment = false;
				}
			)
		);
	}

	// openCommentDeleteConfirmDialog(commentResponse: ReplyResponse): void {
	// 	const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
	// 		data: 'Do you want to delete this comment permanently?',
	// 		autoFocus: false,
	// 		width: '500px'
	// 	});

	// 	dialogRef.afterClosed().subscribe(
	// 		result => {
	// 			if (result) this.deleteComment(commentResponse);
	// 		}
	// 	);
	// }

	// private deleteComment(commentResponse: ReplyResponse) {
	// 	this.subscriptions.push(
	// 		this.markerService.deleteComment(this.data.id, commentResponse.comment.id).subscribe({
	// 			next: (response: any) => {
	// 				const targetIndex = this.commentResponseList.indexOf(commentResponse);
	// 				this.commentResponseList.splice(targetIndex, 1);
	// 				this.dataPost.commentCount--;

	// 				this.matSnackbar.openFromComponent(SnackbarComponent, {
	// 					data: 'Comment deleted successfully.',
	// 					duration: 5000
	// 				});
	// 			},
	// 			error: (errorResponse: HttpErrorResponse) => {
	// 				this.matSnackbar.openFromComponent(SnackbarComponent, {
	// 					data: AppConstants.snackbarErrorContent,
	// 					panelClass: ['bg-danger'],
	// 					duration: 5000
	// 				});
	// 			}
	// 		})
	// 	);
	// }

  isCommentCreator(username:string) {
    return this.authService.getAuthUsername() === username;

  }
}
