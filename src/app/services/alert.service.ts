import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AlertService {
  
  private alertSubject = new Subject<any>(); 

  constructor() { }
   
  public getSuject (){
    return this.alertSubject;
  }
 
  public show (sender:any, msg:any){
    this.alertSubject.next ({sender: sender, msg: msg, type:'success'});
  }

  public err (sender:any, msg:any){
    this.alertSubject.next ({sender: sender, msg: msg, type:'error'});
  }

  public s ( msg:any){
    this.show ('appmain', msg);
  }

  public e (msg:any){
    this.err ('appmain', msg);
  }

   
   
      
}
 
 


