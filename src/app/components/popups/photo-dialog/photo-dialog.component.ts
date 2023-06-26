import { Component, Inject } from '@angular/core';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/models/user-response/app-constants';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../profile/user';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {
  photoPreviewUrl: any;
	photo: File;
	defaultProfilePhotoUrl: string = 'http://localhost:8085/assets/pain.png';

	private subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthService,
		private userService: UserService,
		private thisDialogRef: MatDialogRef<PhotoDialogComponent>,
		private matSnackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.photoPreviewUrl = this.data.authUser.profilePhoto ? this.data.authUser.profilePhoto : this.defaultProfilePhotoUrl;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	previewPhoto(e: any): void {
		if (e.target.files) {
			this.photo = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(this.photo);
			reader.onload = (e: any) => {
				this.photoPreviewUrl = e.target.result;
			}
		}
	}

	savePhoto(): void {
		if (this.photo) {
			this.subscriptions.push(
        this.userService.updateProfilePhoto(this.photo).subscribe(
          (updatedUser: User) => {
            this.authService.storeAuthUserInCache(updatedUser);
            this.photoPreviewUrl = null;
            this.matSnackbar.openFromComponent(SnackbarComponent, {
              data: 'Profile photo updated successfully.',
              duration: 5000
            });
            this.thisDialogRef.close({ updatedUser });
          },
          (errorResponse: HttpErrorResponse) => {
            this.matSnackbar.openFromComponent(SnackbarComponent, {
              data: AppConstants.snackbarErrorContent,
              panelClass: ['bg-danger'],
              duration: 5000
            });
          }
        )
      ); 
		} else {
			this.matSnackbar.openFromComponent(SnackbarComponent, {
				data: 'Please, first upload a photo to save.',
				panelClass: ['bg-danger'],
				duration: 5000
			});
		}
	};
}
