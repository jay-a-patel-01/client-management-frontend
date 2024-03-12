import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { StorageService } from "src/app/services/storage.service";
import { AlertService } from "src/app/services/alert.service";
import { CustomersService } from "src/app/services/customers.service";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  filter: any = {
    customerName: null,
  };

  report: any = {};
  rows: any = [];
  rows2: any = [];
  fileName = "Customers.xlsx";
  city: any = [];
  center: any = [];
  timing: any = [];
  userType: any;
  customers: any = [];

  constructor(
    private alert: AlertService,
    private customersService: CustomersService,
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
    var path = "/customers";
    this.router.navigate([path]);
  }

  Add() {
    this.router.navigate(["/customers/customer"]);
  }

  getProductList() {
    try {
      this.customersService
        .getCustomerList()
        .pipe(first())
        .subscribe((res: any) => {
          if (res && res.status == "error") {
            return;
          }
          this.report = res || {};
          this.rows = this.report || [];
          this.rows2 = this.rows;

          this.customers = this.rows.filter(
            (value: any, index: any, self: any) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.place === value.place &&
                  t.customerName === value.customerName
              )
          );

          if (
            this.rows2 &&
            this.filter.customerName &&
            this.filter.customerName !== ""
          ) {
            var x = this.rows2.filter(
              (x: any) => x.customerName == this.filter.customerName
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

  edit(customerId: any) {
    this.router.navigate(["/customers/customer", customerId]);
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
      this.customersService
        .deleteCustomer(productId)
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
