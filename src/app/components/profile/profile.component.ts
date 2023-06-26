import { Component } from '@angular/core';
import { User } from './user';
import { FollowerComponent } from '../follower/follower.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Subscription } from 'rxjs';
import { PhotoDialogComponent } from '../popups/photo-dialog/photo-dialog.component';
import { ConfirmationDialogComponent } from '../popups/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchComponent } from '../search/search.component';
import { UserResponse } from 'src/app/models/user-response/user-response.module';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { AppConstants } from 'src/app/models/user-response/app-constants';
import { Challenge } from '../plan/challenge.interface';
import axios from 'axios';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authUser: User = {
    id: 1,
    username: 'test',
    email: 'test@gmail.com',
    firstName: 'first',
    lastName: 'name',
    profilePhoto: "",
    role: "",
    followerCount: 0,
    followingCount: 0,
    enabled: true,
    accountVerified: true,
    emailVerified: true,
    joinDate: "",
    dateLastModified: ""
  };
	profileUserId: number;
	profileUser: User;
	// profileUserPostResponses: PostResponse[] = [];
	isProfileViewerOwner: boolean = false;
	viewerFollowsProfileUser: boolean = false;
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = true;
	fetchingResult: boolean = false;
	loadingProfile: boolean = false;
	hasNoPost: boolean = false;
	ongoingChallenges: Challenge[] = [];

	private subscriptions: Subscription[] = [];

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar,
		private auth: AuthService,
		private sharedService:SharedService) { }

	ngOnInit(): void {
		if (!this.authService.isUserLoggedIn()) {
			this.router.navigateByUrl('/login');
		} else {
			this.getAllOngoingChallenges();
			this.sharedService.challenges$.subscribe((challenge: Challenge)=> {
				this.ongoingChallenges = this.ongoingChallenges.filter(item=> item !== challenge);
			})
			this.loadingProfile = true;
			this.authUser = this.authService.getAuthUserFromCache();

			if (this.activatedRoute.snapshot.paramMap.get('userId') === null) {
				this.isProfileViewerOwner = true;
				this.profileUserId = this.authService.getAuthId();
			} else {
				this.profileUserId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
			}

			this.subscriptions.push(
				this.userService.getUserById(this.profileUserId).subscribe({
					next: (foundUserResponse: UserResponse) => {
						const foundUser: User = foundUserResponse.user;
            foundUser.profilePhoto = 'http://localhost:8085/assets/woman-user.svg';
            console.log('FOUND USER:' + foundUser.profilePhoto)

						if (foundUser.id === this.authUser.id) {
							this.router.navigateByUrl('/activity');
						}

						this.viewerFollowsProfileUser = foundUserResponse.followedByAuthUser;
						this.profileUser = foundUser;
            console.log('PROFILE USER:' + this.profileUser.profilePhoto)
						// this.loadProfilePosts(1);

						this.loadingProfile = false;
					}
				})
			);
		}
	}

	getAllOngoingChallenges() {
		let reqParams = {
		  username: this.auth.getAuthUsername()
		}
	
		return axios.get<Challenge[]>(`http://localhost:8070/api/challenge/ongoing`,{params:reqParams}).then(data=>{
		  console.log("ONGOING", data);
		  this.ongoingChallenges = data.data;
		  console.log("TODO", this.ongoingChallenges);
		})
	  }

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

  openSearchDialog(): void {
		this.matDialog.open(SearchComponent, {
			autoFocus: true,
			width: '500px'
		});
	}

	stopPropagation(e: Event): void {
		e.stopPropagation();
	}

	// loadProfilePosts(currentPage: number): void {
	// 	if (!this.fetchingResult) {
	// 		this.fetchingResult = true;
	// 		this.subscriptions.push(
	// 			this.userService.getUserPosts(this.profileUserId, currentPage, this.resultSize).subscribe({
	// 				next: (postResponses: PostResponse[]) => {
	// 					postResponses.forEach(post => this.profileUserPostResponses.push(post));
	// 					if (postResponses.length <= 0 && this.resultPage === 1)  this.hasNoPost = true;
	// 					if (postResponses.length <= 0) this.hasMoreResult = false;
	// 					this.fetchingResult = false;
	// 					this.resultPage++;
	// 				},
	// 				error: (errorResponse: HttpErrorResponse) => {
	// 					this.matSnackbar.openFromComponent(SnackbarComponent, {
	// 						data: AppConstants.snackbarErrorContent,
	// 						panelClass: ['bg-danger'],
	// 						duration: 5000
	// 					});
	// 				}
	// 			})
	// 		);
	// 	}
	// }

	openFollowingDialog(user: User): void {
		this.matDialog.open(FollowerComponent, {
			data: {
				user,
				type: 'following'
			},
			autoFocus: false,
			minWidth: '400px',
			maxWidth: '500px'
		});
	}

	openFollowerDialog(user: User): void {
		this.matDialog.open(FollowerComponent, {
			data: {
				user,
				type: 'follower'
			},
			autoFocus: false,
			minWidth: '400px',
			maxWidth: '500px'
		});
	}

	openViewPhotoDialog(photoUrl: string): void {
		this.matDialog.open(PhotoDialogComponent, {
			data: photoUrl,
			autoFocus: false,
			maxWidth: '1200px'
		});
	}

	openFollowConfirmDialog(userId: number): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: `Do you want to follow ${this.profileUser.firstName + ' ' + this.profileUser.lastName}?`,
			autoFocus: false,
			maxWidth: '500px'
		});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.followUser(userId).subscribe({
							next: (response: any) => {
								this.viewerFollowsProfileUser = true;
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You are following ${this.profileUser.firstName + ' ' + this.profileUser.lastName}.`,
									duration: 5000
								});
							},
							error: (errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
							}
						})
					);
				}
			}
		);
	}

	openUnfollowConfirmDialog(userId: number): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: `Do you want to stop following ${this.profileUser.firstName + ' ' + this.profileUser.lastName}?`,
			autoFocus: false,
			maxWidth: '500px'
		});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.unfollowUser(userId).subscribe({
							next: (response: any) => {
								this.viewerFollowsProfileUser = false;
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You no longer follow ${this.profileUser.firstName + ' ' + this.profileUser.lastName}.`,
									duration: 5000
								});
							},
							error: (errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
							}
						})
					);
				}
			}
		);
	}

	openPhotoUploadDialog(e: Event, uploadType: string): void {
		e.stopPropagation();
		let header = 'Upload Profile Photo';

		const dialogRef = this.matDialog.open(PhotoDialogComponent, {
			data: { authUser: this.authUser, uploadType, header },
			autoFocus: false,
			minWidth: '300px',
			maxWidth: '900px',
			maxHeight: '500px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.profileUser.profilePhoto = result.updatedUser.profilePhoto;
			}
		});
  }

	// handlePostDeletedEvent(postResponse: PostResponse): void {
	// 	document.getElementById(`profilePost${postResponse.post.id}`).remove();
	// }
}
