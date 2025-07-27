import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('auth_token');

  // List of endpoints that should NOT have the token
  const excludedUrls = ['/api/Auth/login', '/api/Auth/signup'];

  // Check if current request should be excluded
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));
  console.log('Request :', req);
  console.log('Token:', token);
  if (token && !isExcluded) {
    console.log('Token found, adding to request headers');
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  console.log(
    'No token found or request is excluded, proceeding without token'
  );

  return next(req);
};
