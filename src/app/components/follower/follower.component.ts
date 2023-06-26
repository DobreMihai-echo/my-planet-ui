import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { User } from '../profile/user';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/models/user-response/app-constants';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent {
  userResponseList: User[] = [];
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = false;
	fetchingResult: boolean = false;
	defaultProfilePhotoUrl = 'http://localhost:8085/assets/woman-user.svg';

	private subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private userService: UserService,
		private matSnackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.loadUsers(1);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadUsers(currentPage: number): void {
		if (!this.fetchingResult) {
			if (this.data.type === 'following') {
				if (this.data.user.followingCount > 0) {
					this.fetchingResult = true;
	
					this.subscriptions.push(
            this.userService.getUserFollowingList(this.data.user.id, currentPage, this.resultSize).subscribe(
              (followingList: User[]) => {
                followingList.forEach(uR => this.userResponseList.push(uR));
                if (currentPage * this.resultSize < this.data.user.followingCount) {
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
          );
				}
			} else if (this.data.type === 'follower') {
				if (this.data.user.followerCount > 0) {
					this.fetchingResult = true;
	
					this.subscriptions.push(
						this.userService.getUserFollowerList(this.data.user.id, currentPage, this.resultSize).subscribe(
							(followerList: User[]) => {
								followerList.forEach(uR => this.userResponseList.push(uR));
								if (currentPage * this.resultSize < this.data.user.followerCount) {
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
          );
						}
				}
			}
		}
	}
