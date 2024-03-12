import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router, 
    private storageService: StorageService,
       ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   //  const isloggedIn = this.authenticationService.isLoggedIn ();
     const accessToken = this.storageService.get('accessToken'); 
     
      if (!accessToken) {
       // this.router.navigate (['/login']);
        return false;
      }
     
      return true;
  }
}
