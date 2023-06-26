import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../components/profile/user';
import { UserResponse } from '../models/user-response/user-response.module';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

	getUserById(userId: number): Observable<UserResponse> {
    let params = new HttpParams().set('userId',userId);
		return this.httpClient.get<UserResponse>(`user/api/userid`,{params:params}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Properly throw the error so it can be caught in the subscription error handler.
      })
    );
	}

  getUserByUsername(username: string): Observable<User > {
    let params = new HttpParams().set('username',username);
		return this.httpClient.get<User>(`user/api/user`,{params:params});
	}

  getUserFollowingList(userId: number, page: number, size: number): Observable<User[]> {
    const reqParams = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<User[]>(`user/api/users/${userId}/following`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Properly throw the error so it can be caught in the subscription error handler.
      })
    );
  }

  getUserFollowerList(userId: number, page: number, size: number): Observable<User[]> {
    const reqParams = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<User[]>(`user/api/users/${userId}/follower`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Properly throw the error so it can be caught in the subscription error handler.
      })
    );
  }

  updateProfilePhoto(profilePhoto: File): Observable<User> {
		const formData = new FormData();
		formData.append('profilePhoto', profilePhoto);
		return this.httpClient.post<User>(`user/api/users/account/update/profile-photo`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
	}

  getUsersByListOfUsernames(usernames:string[]){
    return this.httpClient.post<User[]>(`user/api/users/event`,usernames);
  }

	// getUserPosts(userId: number, page: number, size: number): Observable<PostResponse[] | HttpErrorResponse> {
	// 	const reqParams = new HttpParams().set('page', page).set('size', size);
	// 	return this.httpClient.get<PostResponse[] | HttpErrorResponse>(`${this.host}/users/${userId}/posts`, { params: reqParams });
	// }

	// verifyEmail(token: string): Observable<HttpResponse<any> | HttpErrorResponse> {
	// 	return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/verify-email/${token}`, null);
	// }

	// updateUserInfo(updateUserInfo: UpdateUserInfo): Observable<User | HttpErrorResponse> {
	// 	return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/info`, updateUserInfo);
	// }

	// updateUserEmail(updateUserEmail: UpdateUserEmail): Observable<any | HttpErrorResponse> {
	// 	return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/email`, updateUserEmail);
	// }

	// updateUserPassword(updateUserPassword: UpdateUserPassword): Observable<any | HttpErrorResponse> {
	// 	return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/password`, updateUserPassword);
	// }

	// updateProfilePhoto(profilePhoto: File): Observable<User | HttpErrorResponse> {
	// 	const formData = new FormData();
	// 	formData.append('profilePhoto', profilePhoto);
	// 	return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/profile-photo`, formData);
	// }

	// updateCoverPhoto(coverPhoto: File): Observable<User | HttpErrorResponse> {
	// 	const formData = new FormData();
	// 	formData.append('coverPhoto', coverPhoto);
	// 	return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/cover-photo`, formData);
	// }

	followUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`user/api/account/follow/${userId}`, null);
	}

	unfollowUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`user/api/account/unfollow/${userId}`, null);
	}

	getUserSearchResult(key: string, page: number, size: number): Observable<UserResponse[]> {
		const reqParams = new HttpParams().set('key', key).set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[]>(`user/api/users/search`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
	}

	// forgotPassword(email: string): Observable<any | HttpErrorResponse> {
	// 	const reqParams = new HttpParams().set('email', email);
	// 	return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/forgot-password`, null, { params: reqParams });
	// }

	// resetPassword(token: string, resetPassword: ResetPassword): Observable<any | HttpErrorResponse> {
	// 	return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/reset-password/${token}`, resetPassword);
	// }
}