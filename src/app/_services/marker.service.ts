import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from '../components/events/marker.interface';
import { ReplyResponse } from '../components/popups/reply/comment.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  API_URL = 'events';

  constructor(private http: HttpClient) { }


  postEvent(createdMarker: Marker) {
    return this.http.post<Marker[]>(`${this.API_URL}/api/events`,createdMarker);
  }

  getAllMarkers() {
    return this.http.get<Marker[]>(`${this.API_URL}/api/events`);
  }

  deleteMarker(eventId:number) {
    return this.http.delete<Marker[]>(`${this.API_URL}/api/events/${eventId}`);
  }

  updateMarker(eventId:number, eventObject: Marker) {
    return this.http.put<Marker[]>(`${this.API_URL}/api/events/${eventId}`,eventObject);
  }

  joinEvent(eventId:number, username:string) {
    const reqParams = new HttpParams().set('eventId', eventId).set('username', username);
  
    return this.http.put<string[]>(`${this.API_URL}/api/events/join`, null, { params: reqParams });
  }

  unjoinEvent(eventId:number, username:string) {
    const reqParams = new HttpParams().set('eventId', eventId).set('username', username);

    console.log("EVENTID:", reqParams)
  
    return this.http.delete<string[]>(`${this.API_URL}/api/events/unjoin`, { params: reqParams });
  }


  getEventComments(eventId: number, page: number, size: number): Observable<ReplyResponse[]> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.http.get<ReplyResponse[]>(`${this.API_URL}/api/events/${eventId}/messages`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse)=> {
        return throwError(error);
      })
    );
	}

  createEventComment(eventId: number, content: string, username:string): Observable<ReplyResponse > {
		const formData = new FormData();
		formData.append('content', content);
    const reqParams = new HttpParams().set('username', username);
		return this.http.post<ReplyResponse>(`${this.API_URL}/api/events/${eventId}/messages/create`, formData, {params: reqParams}).pipe(
      catchError((error: HttpErrorResponse)=> {
        return throwError(error);
      })
    );
	}



}
