import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { ClientsService } from "src/app/services/clients.service";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import * as moment from "moment";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;
  datauploading: boolean = false;
  bsValue = new Date();
  client_id: any;
  client: any = [];
  clientList: any = [];
  todayDate: Date = new Date();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {
    this.route.params.subscribe(async (params) => {
      this.client_id = params["id"];
    });

    this.clientForm = this.fb.group({
      clientName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", Validators.required],
      address: ["", Validators.required],
      subscription_start_date: ["", Validators.required],
      subscription_end_date: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.datauploading = false;
  }

  ngOnInit() {
    this.datauploading = false;
    if (this.client_id) {
      this.getClient(this.client_id);
    }
  }

  ngOnDestroy() {}

  goBack() {
    var path = "/clients";
    this.router.navigate([path]);
  }

  reset() {
    this.clientForm.reset();
    this.clientForm = this.fb.group({
      clientName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", Validators.required],
      address: ["", Validators.required],
      subscription_start_date: ["", Validators.required],
      subscription_end_date: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.datauploading = false;
  }

  blurEvent(e: any) {
    document.getElementById("submitButton")?.focus();
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9()',.-]+[\ ]?[a-zA-Z0-9()',.-\s]*/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  saveClient() {
    try {
      this.datauploading = true;

      let {
        clientName,
        email,
        mobileNumber,
        address,
        subscription_start_date,
        subscription_end_date,
        password,
      } = this.clientForm.value;
      subscription_start_date = moment(subscription_start_date).format(
        "YYYY-MM-DD"
      );
      subscription_end_date = moment(subscription_end_date).format(
        "YYYY-MM-DD"
      );

      if (this.client_id) {
        var obj = {
          _id: this.client_id,
          clientName: clientName.trim(),
          email: email.trim(),
          mobileNumber: mobileNumber,
          address: address.trim(),
          subscription_start_date: subscription_start_date,
          subscription_end_date: subscription_end_date,
          password: password,
        };
        this.clientsService
          .updateClient(obj)
          .pipe(first())
          .subscribe((res: any) => {
            if (res && res.status == "error") {
              alert(res.message);
              return;
            }

            alert(res.message);
            this.reset();
            this.router.navigate(["/clients/client-list"]);
          });
      } else {
        var obj2 = {
          clientName: clientName.trim(),
          email: email.trim(),
          mobileNumber: mobileNumber.trim(),
          address: address.trim(),
          subscription_start_date: subscription_start_date,
          subscription_end_date: subscription_end_date,
          password: password,
        };
        this.clientsService
          .saveClient(obj2)
          .pipe(first())
          .subscribe((res: any) => {
            if (res && res.status == "error") {
              alert(res.message);
              return;
            }

            alert(res.message);
            this.reset();
            this.router.navigate(["/clients/client-list"]);
          });
      }
    } catch (e: any) {
      if (e && e.status == 401) {
        this.auth.signOut();
      }
    }
  }

  parseResponse(data: any) {
    return data.data[0].msg;
  }

  parseError(data: any) {
    const err = data?.error?.data[0]?.msg?.split("!:::");
    return err ? (err[1] ? err[1] : err[0]) : "Something went wrong!";
  }

  getClient(client_id: any) {
    try {
      this.clientsService
        .getClient(client_id)
        .pipe(first())
        .subscribe((res: any) => {
          if (res && res.status == "error") {
            return;
          }
          this.client = res;
          this.clientForm.setValue({
            clientName: this.client.clientName,
            email: this.client.email,
            mobileNumber: this.client.mobileNumber,
            address: this.client.subscription_start_date,
            subscription_start_date: this.client.subscription_start_date,
            subscription_end_date: this.client.subscription_end_date,
            password: this.client.password,
          });
          console.log("client", this.client);
        });
    } catch (e: any) {
      if (e && e.status == 401) {
        this.auth.signOut();
      }
    }
  }
}
