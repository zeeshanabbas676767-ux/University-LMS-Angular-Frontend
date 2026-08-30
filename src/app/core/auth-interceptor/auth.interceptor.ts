// auth.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
}
