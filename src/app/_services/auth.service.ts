import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { User } from '../components/profile/user';

const AUTH_API = '/user/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private authUser: User;
  loginSubject = new Subject<User>();

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      { observe: 'response', withCredentials: true }
    ).pipe(
      tap(response => {
        console.log(response)
        const setCookieHeader = response.headers.get('Set-Cookie');
        console.log("COOKIE:" + setCookieHeader)
        if (setCookieHeader) {
          const token = setCookieHeader.match(/myplanet=([^;]+)/)![1];
          document.cookie = `jwtToken=${token}`;
        }
      }),
      map(response => response.body)
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  getAuthId() {
    let authUser = sessionStorage.getItem('auth-user');
    if(authUser) {
      let item = JSON.parse(authUser);
      return item.id;
    }
  }

  getAuthUsername() {
    let authUser = sessionStorage.getItem('auth-user');
    if(authUser) {
      let item = JSON.parse(authUser);
      return item.username;
    }
  }

  isUserLoggedIn(): boolean {
    console.log("SESSION",sessionStorage.getItem('auth-user'));
		if(sessionStorage.getItem('auth-user')) {
      return true;
    }

    return false;
	}

  getAuthUserFromCache() {
    let authUser = sessionStorage.getItem('auth-user');
    if(authUser) {
      return JSON.parse(authUser);
    }
  }

  storeAuthUserInCache(authUser: User): void {
		if (authUser != null) {
			this.authUser = authUser;
			sessionStorage.setItem('auth-user', JSON.stringify(authUser));
		}
		this.loginSubject.next(authUser);
	}

}
