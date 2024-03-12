import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomersRouteModule } from "./customers-route.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullLayoutComponent } from "./full-layout/full-layout.component";
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from "src/app/shared";
@NgModule({
  declarations: [
    FullLayoutComponent,
    CustomerComponent,
    CustomerListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    CustomersRouteModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  exports: [
    FullLayoutComponent,
    CustomerComponent,
    CustomerListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

  ],
  providers: [BsDatepickerConfig],
})
export class CustomersModule {}
