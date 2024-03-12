import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FullLayoutComponent } from "./full-layout/full-layout.component";
import { AuthguardService } from "src/app/services/authguard.service";
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
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
          title: "client-list",
        },
        component: ClientListComponent,
      },
     
      {
        path: "client",
        data: {
          title: "client add",
        },
        component: ClientComponent,
      },
      {
        path: "client/:id",
        data: {
          title: "client edit",
        },
        component: ClientComponent,
      },
      {
        path: "client-list",
        data: {
          title: "Client List",
        },
        component: ClientListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRouteModule {}
