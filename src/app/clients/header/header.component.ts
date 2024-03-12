import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName :string = "";
  uploadPhoto:boolean = true;
  uploadSignature:boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
    let obj:any = localStorage.getItem('details');
    obj = JSON.parse(obj);

   
    if(obj && obj.Email){
      this.userName = obj.Email;
    }

    
  }

  getFirstStyles() {
    var setting = {};
   
      setting = {
        'margin-top': '20px', 
        'background-color': 'rgb(38, 138, 213)',
        'color': 'white'
    
    }
    return setting;
  }


 
 
  signOut(){
   
    this.auth.signOut()
        // this.auth.saveLogin(null);
        // localStorage.removeItem('details')
        // this.router.navigate(["/"]);
    
  }
 

}
