import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private path = '/authentication';

  constructor(private backendService: BackendService,
              private storageService: StorageService,   private router: Router ) { }

  isLoggedIn () {
  const accessToken = this.storageService.get('accessToken'); 
 
   if( accessToken) {
      return true;
    } else {
      return false;
    }
  }

  me () {
    return this.storageService.get('details');
  }

  getAuthToken () {
    const accessToken = this.storageService.get('accessToken');
    if (!accessToken) {
      return null;
    } else {
      return accessToken;
    }
  }

  saveLogin (userDetails: any) {
    this.storageService.save ('accessToken', userDetails);
  }


  getUserDetails(){
     return this.storageService.get('details');
  }

 
  signOut(){
   
 
    this.saveLogin(null);
    localStorage.removeItem('details')
    this.router.navigate(["/"]);

}
}
