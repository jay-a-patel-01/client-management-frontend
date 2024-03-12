import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsRouteModule } from "./clients-route.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullLayoutComponent } from "./full-layout/full-layout.component";
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { SharedModule } from "src/app/shared";
@NgModule({
  declarations: [
    FullLayoutComponent,
    ClientComponent,
    ClientListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ClientsRouteModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  exports: [
    FullLayoutComponent,
    ClientComponent,
    ClientListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

  ],
  providers: [BsDatepickerConfig],
})
export class ClientsModule {}
