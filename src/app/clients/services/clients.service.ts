import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private path = '/api/client';

  constructor(private backendService:BackendService) { }

  saveClient(data:any){
    return this.backendService.post (this.path  +"/createclient", data);
  }
  
  updateClient(data:any){
    return this.backendService.post (this.path  +"/updateclient" , data);
  }

  deleteClient(clientid:any){
    return this.backendService.post (this.path  +"/deleteclient" , {clientid:clientid});
  }

  getClientList(){
  return this.backendService.get (this.path  +"/getclientlist");
  }
  
  getClient(clientid:any){
    return this.backendService.get (this.path  +"/getclient/" + clientid);
  }


}
