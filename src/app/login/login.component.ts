import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { parseError, parseResponse, url } from "src/models/common";
import * as moment from "moment";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private msg: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {
    this.searchForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  toCandidateResponse() {
    const { Email } = this.searchForm.value;
    this.http.post<any>(`${url}/auth/login`, this.searchForm.value).subscribe(
      (data) => {
        if (data && data.success == true) {
          const res = parseResponse(data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("details", JSON.stringify(data));
          let userDetails: any = localStorage.getItem("details");
          userDetails = JSON.parse(userDetails);
          if (userDetails.role == "admin") {
            this.router.navigate([`/clients/client-list`]);
          } else if (userDetails.role == "client") {
            let todaydate = moment(new Date()).format("YYYY-MM-DD");
            let subscription_end_date = moment(
              userDetails.subscription_end_date
            ).format("YYYY-MM-DD");
            if (subscription_end_date < todaydate) {
              alert("Your subscription is expired!!!");
              return;
            }
            this.router.navigate([`/customers/customer-list`]);
          }
        } else {
          alert(
            "Email Id OR  Password not found.Please Enter Valid Email Id OR Passsword"
          );
          return;
        }
      },
      (err) => {
        this.msg.error(parseError(err));
      }
    );
  }

  reset() {
    this.searchForm.reset();
    this.msg.success("Form has been reset !");
  }
  ForgotRegistrationId() {
    this.router.navigate(["/forgot-registrationid"]);
  }
  blurEvent(e: any) {
    document.getElementById("submitButton")?.focus();
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
