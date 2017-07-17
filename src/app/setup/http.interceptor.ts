import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = localStorage.getItem(environment.tokenName);
    if (authHeader) {
      const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${authHeader}`)});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
