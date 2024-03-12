import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  result: any[] = [];
  expandAll: boolean = false;
  userType: any;
  constructor(
    private _http: HttpClient,
    private storageService: StorageService
  ) {
    let userDetails: any = this.storageService.get("details");
    userDetails = JSON.parse(userDetails);
    this.userType = userDetails.role;
    if (this.userType == "admin") {
      this._http.get<any[]>("assets/sidebar-admin.json").subscribe((res) => {
        this.result = res;
      });
    } else {
      this._http.get<any[]>("assets/sidebar.json").subscribe((res) => {
        this.result = res;
      });
    }
  }

  ddToggle(i: number) {
    this.result[i].menu = !this.result[i].menu;
  }

  toggleAll() {
    this.expandAll = !this.expandAll;
    for (var i = 0; i < this.result.length; i++) {
      this.result[i].menu = this.expandAll;
    }
  }
}
