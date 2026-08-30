// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './core/auth-interceptor/auth.interceptor';
import { withInterceptors } from '@angular/common/http';
import { Observable } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor , credentialsInterceptor]))
  ]
};



function credentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  req = req.clone({
    withCredentials: true
  });
  return next(req);
}
// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './shared/auth-interceptor/auth.interceptor';
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(
//       withInterceptors([authInterceptor])
//     ),
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes)
//   ]
// };

