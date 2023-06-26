import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if(req.url.includes('api') ) {
    //     return next.handle(req);
    // }
    // req = req.clone({
    //   withCredentials: true,
    // });

    return next.handle(req);
  }
}

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
// ]; 