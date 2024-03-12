import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { StorageService } from "src/app/services/storage.service";
import { AlertService } from "src/app/services/alert.service";
import { ClientsService } from "src/app/services/clients.service";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit, OnDestroy {
  filter: any = {
    clientName: null,
  };

  report: any = {};
  rows: any = [];
  rows2: any = [];
  fileName = "Clients.xlsx";
  city: any = [];
  userType: any;
  clients: any = [];

  constructor(
    private alert: AlertService,
    private clientsService: ClientsService,
    private router: Router,
    private storageService: StorageService,
    private auth: AuthenticationService
  ) {
    let userDetails: any = this.storageService.get("details");
    userDetails = JSON.parse(userDetails);
    this.userType = userDetails.role;
    this.getReport();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  goBack() {
    var path = "/clients";
    this.router.navigate([path]);
  }

  Add() {
    this.router.navigate(["/clients/client"]);
  }

  getProductList() {
    try {
      this.clientsService
        .getClientList()
        .pipe(first())
        .subscribe((res: any) => {
          if (res && res.status == "error") {
            return;
          }
          this.report = res || {};
          this.rows = this.report || [];
          this.rows2 = this.rows;

          this.clients = this.rows.filter(
            (value: any, index: any, self: any) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.place === value.place && t.clientName === value.clientName
              )
          );

          if (
            this.rows2 &&
            this.filter.clientName &&
            this.filter.clientName !== ""
          ) {
            var x = this.rows2.filter(
              (x: any) => x.clientName == this.filter.clientName
            );
            if (x) {
              this.rows = x;
            } else {
              this.rows = [];
            }
          }
        });
    } catch (e: any) {
      if (e && e.status == 401) {
        this.auth.signOut();
      }
    }
  }

  edit(clientId: any) {
    this.router.navigate(["/clients/client", clientId]);
  }

  delete(productId: any) {
    let options: SweetAlertOptions = {
      title: "Confirm Details",
      text: "Please confirm, Are you sure to delete the same?",
      showCancelButton: true,
      confirmButtonText: "Yes, I have confirmed",
    };
    Swal.fire(options).then((result: any) => {
      if (!result.isConfirmed) {
        return;
      }
      this.deleteProduct(productId);
    });
  }

  deleteProduct(productId: any) {
    try {
      this.clientsService
        .deleteClient(productId)
        .pipe(first())
        .subscribe((res: any) => {
          if (res && res.status == "error") {
            alert(res.message);
            return;
          }
          this.getProductList();
          alert(res.message);
        });
    } catch (e: any) {
      if (e && e.status == 401) {
        this.auth.signOut();
      }
    }
  }

  getReport() {
    this.getProductList();
  }
}
