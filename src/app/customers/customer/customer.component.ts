import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { AlertService } from "src/app/services/alert.service";
import { CustomersService } from "src/app/services/customers.service";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  bsValue = new Date();
  customer_id: any;
  customer: any = [];
  customerList: any = [];
  countryList: any = [
    { id: "India", countyName: "India" },
    { id: "USA", countyName: "USA" },
  ];
  stateList: any = [
    { id: "Gujarat", countryId: "India", sateName: "Gujarat" },
    { id: "Maharastra", countryId: "India", sateName: "Maharastra" },
    { id: "Texas", countryId: "USA", sateName: "Texas" },
  ];
  cityList = [
    {
      id: "Vadodara",
      countryId: "India",
      stateId: "Gujarat",
      cityName: "Vadodara",
    },
    {
      id: "Ahmedabad",
      countryId: "India",
      stateId: "Maharastra",
      cityName: "Mumbai",
    },
    {
      id: "New York",
      countryId: "USA",
      stateId: "Texas",
      cityName: "New York",
    },
  ];
  constructor(
    private alert: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private customersService: CustomersService
  ) {
    this.route.params.subscribe(async (params) => {
      this.customer_id = params["id"];
    });

    this.customerForm = this.fb.group({
      customerName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", Validators.required],
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],
    });
  }

  ngOnInit() {
    if (this.customer_id) {
      this.getcustomer(this.customer_id);
    }
  }

  ngOnDestroy() {}

  onChangeCountry(event: any) {
    const countryId = event.target.value;
    this.stateList = [
      { id: "Gujarat", countryId: "India", sateName: "Gujarat" },
      { id: "Maharastra", countryId: "India", sateName: "Maharastra" },
      { id: "Texas", countryId: "USA", sateName: "Texas" },
    ];
    console.log(countryId);
    this.stateList = this.stateList.filter(
      (state: any) => state.countryId == countryId
    );
    console.log(this.stateList);
  }

  onChangeState(event: any) {
    this.cityList = [
      {
        id: "Vadodara",
        countryId: "India",
        stateId: "Gujarat",
        cityName: "Vadodara",
      },
      {
        id: "Ahmedabad",
        countryId: "India",
        stateId: "Maharastra",
        cityName: "Mumbai",
      },
      {
        id: "New York",
        countryId: "USA",
        stateId: "Texas",
        cityName: "New York",
      },
    ];
    const stateId = event.target.value;
    console.log(stateId);

    this.cityList = this.cityList.filter(
      (city: any) =>
        city.countryId == this.customerForm.value.countryId &&
        city.stateId == stateId
    );
    console.log(this.cityList);
  }

  goBack() {
    var path = "/customers";
    this.router.navigate([path]);
  }

  reset() {
    this.customerForm.reset();
    this.customerForm = this.fb.group({
      customerName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", Validators.required],
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],
    });
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

  saveCustomer() {
    try {
      let { customerName, email, mobileNumber, countryId, stateId, cityId } =
        this.customerForm.value;
      if (this.customer_id) {
        var obj = {
          _id: this.customer_id,
          customerName: customerName.trim(),
          email: email.trim(),
          mobileNumber: mobileNumber,
          countryId: countryId,
          stateId: stateId,
          cityId: cityId,
        };
        this.customersService
          .updateCustomer(obj)
          .pipe(first())
          .subscribe((res: any) => {
            if (res && res.status == "error") {
              alert(res.message);
              return;
            }

            alert(res.message);
            this.reset();
            this.router.navigate(["/customers/customer-list"]);
          });
      } else {
        var obj2 = {
          customerName: customerName.trim(),
          email: email.trim(),
          mobileNumber: mobileNumber.trim(),
          countryId: countryId,
          stateId: stateId,
          cityId: cityId,
        };
        this.customersService
          .saveCustomer(obj2)
          .pipe(first())
          .subscribe((res: any) => {
            if (res && res.status == "error") {
              alert(res.message);
              return;
            }

            alert(res.message);
            this.reset();
            this.router.navigate(["/customers/customer-list"]);
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

  getcustomer(customer_id: any) {
    try {
      this.customersService
        .getCustomer(customer_id)
        .pipe(first())
        .subscribe((res: any) => {
          if (res && res.status == "error") {
            return;
          }
          this.customer = res;
          this.customerForm.setValue({
            customerName: this.customer.customerName,
            email: this.customer.email,
            mobileNumber: this.customer.mobileNumber,
            countryId: this.customer.countryId,
            stateId: this.customer.stateId,
            cityId: this.customer.cityId,
          });
          console.log("customer", this.customer);
        });
    } catch (e: any) {
      if (e && e.status == 401) {
        this.auth.signOut();
      }
    }
  }
}
