import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { SaleUserService } from '../../services/sale-user.service';
import { AllVehicleService } from '../../services/all-vehicle.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  
  employeedata: any;
  bookingForm: FormGroup;
  public date1: any;
  public date2: any;

  //personal information
  name = '';
  dob: any;
  // relationName = '';
  address = '';
  // mandal = '';
  // pincode = '';
  // districtName = '';
  mobile = '';
  email = '';
  //particulars
  vehicleColor = '';
  vehicleModel = '';
  vehicleVariant = '';
  priceEstimation = '';
  advancePayment = '';
  dateOfDelivery = '';
  approvedAmount = '';
  approvedBy = ';'

  modelData: any[];
  colorData: any[];
  variantData: any[];

  public options = { position: ["top", "right"] }

  constructor(private notif: NotificationsService, private allvehicleservice: AllVehicleService, private saleUserService: SaleUserService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private http: Http, private router: Router) { }

  ngOnInit() {
    this.allvehicleservice.getColor().subscribe(data => {
      if (data.json().status == true) {
        this.colorData = data.json().result;
      } else {
        this.colorData = [];
      }
    });

    this.allvehicleservice.getModel().subscribe(data => {
      if (data.json().status == true) {
        this.modelData = data.json().result;
      } else {
        this.modelData = [];
      }
    });

    this.allvehicleservice.getVariant().subscribe(data => {
      if (data.json().status == true) {
        this.variantData = data.json().result;
      } else {
        this.variantData = [];
      }
    })

    this.http.get(environment.host + 'employees').subscribe(employeedata => {
      if (employeedata.json().status == true) {
        this.employeedata = employeedata.json().result;
      } else {
        this.employeedata = [];
      }
    });

    this.bookingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      // relation: ['', Validators.required],
      custAddress: ['', Validators.required],
      // custMandal: ['', Validators.required],
      // custPinecode: ['', Validators.required],
      // custDistrict: ['', Validators.required],
      custMobile: ['', Validators.required],
      custEmail: ['', [Validators.required, Validators.email]],
      vehicleModelf: ['', Validators.required],
      vehicleVariantf: ['', Validators.required],
      vehicleColorf: ['', Validators.required],
      // estimation: ['', Validators.required],
      payment: ['', Validators.required],
      amountApproved: ['', Validators.required]
    });
  }

  get f() { return this.bookingForm.controls; }

  redirectToBookingForm(){
    this.router.navigate(['list-bookings']);
  }

  estimationPrice() {
    if (this.vehicleVariant) {
      this.saleUserService.getPriceListType(this.vehicleVariant,0).subscribe(res => {
        this.priceEstimation = res.json().result[0]["TOTAL"];
      })
    }
  }

  addBookingForm() {
    if (this.bookingForm.invalid) {
      return;
    }
    var data = {
      booking_form_name: this.name,
      booking_form_dob: this.dob,
      booking_form_address: this.address,
      booking_form_mobile: this.mobile,
      booking_form_email: this.email,
      vehicle_model: this.vehicleModel,
      vehicle_variant: this.vehicleVariant,
      vehicle_color: this.vehicleColor,
      price_estimation: this.priceEstimation,
      advance_payment: this.advancePayment,
      date_of_delivery: this.dateOfDelivery,
      approved_amount: this.approvedAmount,
      approved_by: this.approvedBy,
      status: "1"
    }
    this.saleUserService.saveBookingForm(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Indent Raised Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          })
      }
      this.cancelForm()
    })
  }

  cancelForm() {
    this.name = " ";
    this.dob = null;
    this.mobile = " ";
    this.email = " ";
    this.address = " ";
    this.vehicleColor = " ";
    this.vehicleModel = " ";
    this.vehicleVariant = " ";
    this.priceEstimation = null;
    this.advancePayment = " ";
    this.dateOfDelivery = null;
    this.approvedAmount = " ";
    this.approvedBy = " ";
  }

  getreqDate() {
    let newDate = moment(this.dob).format('YYYY-MM-DD').toString();
    this.dob = newDate;
  }
  getDeliveryDate() {
    let newDate2 = moment(this.dateOfDelivery).format('YYYY-MM-DD').toString();
    this.dateOfDelivery = newDate2
  }

  //this method  allow alphabets 
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

}
