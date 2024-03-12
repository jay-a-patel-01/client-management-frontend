import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "./full-layout/full-layout.component";
import { AuthguardService } from "src/app/services/authguard.service";
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "",
    },
    canActivate: [AuthguardService],
    component: FullLayoutComponent,
    children: [
      {
        path: "",
        data: {
          title: "customer-list",
        },
        component: CustomerListComponent,
      },
     
      {
        path: "customer",
        data: {
          title: "customer add",
        },
        component: CustomerComponent,
      },
      {
        path: "customer/:id",
        data: {
          title: "customer edit",
        },
        component: CustomerComponent,
      },
      {
        path: "customer-list",
        data: {
          title: "Customer List",
        },
        component: CustomerListComponent,
      },
   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRouteModule {}
