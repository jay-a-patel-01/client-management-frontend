import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { StorageService} from "src/app/services/storage.service";

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private storageService: StorageService,
   ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var authReq = null;
  
   const accessToken = this.storageService.get('accessToken'); 
    if (accessToken) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accessToken': accessToken
        })
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      });
    }

    return next
      .handle(authReq)
      .pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
         
          }
        })
      )
  }
}
