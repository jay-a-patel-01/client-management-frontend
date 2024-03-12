import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private path = '/api/customer';

  constructor(private backendService:BackendService) { }

  saveCustomer(data:any){
    return this.backendService.post (this.path  +"/createcustomer", data);
  }
  
  updateCustomer(data:any){
    return this.backendService.post (this.path  +"/updatecustomer" , data);
  }

  deleteCustomer(customerid:any){
    return this.backendService.post (this.path  +"/deletecustomer" , {customerid:customerid});
  }

  getCustomerList(){
  return this.backendService.get (this.path  +"/getcustomerlist");
  }
  
  getCustomer(customerid:any){
    return this.backendService.get (this.path  +"/getcustomer/" + customerid);
  }


}
