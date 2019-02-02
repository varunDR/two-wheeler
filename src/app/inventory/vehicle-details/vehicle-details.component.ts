import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDetailService } from '../../services/vehicle-detail.service';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  bikes: any[];
  cols: any[];
  deleteData: any = [];
  editData: any = [];
  public date1: any;
  public date2: any;
  public date3: any;
  updateDate: any;
  temp: any
  temp1: any;

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  vehicle: any = {
    'vehicleId': '',
    'invoiceNum': '',
    'invoiceDate': '',
    'invoiceEditDate': '',
    'sourcedFrom': '',
    'vehicleType': '',
    'vehicleColor': '',
    'vehicleMake': '',
    'vehicleModel': '',
    'vehicleVariant': '',
    'engineNumber': '',
    'vehicleName': '',
    'engineNum1': '',
    'engineNum2': '',
    'gateNumber': '',
    'frameNumber': '',
    'dcNumber': '',
    'status': ''
  }
  disableSave: boolean = true;
  vehicleForm: FormGroup;
  submitted = false;

  vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleVariantFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private cdr: ChangeDetectorRef, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private service: VehicleDetailService, private formBuilder: FormBuilder, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getVehicleDetails().subscribe(res => {
      if (res.json().status == true) {
        this.bikes = res.json().result
      }
      else {
        this.bikes = [];
      }
      this.spinner.hide();
    });

    let _color = this.completevehicle.getColor();
    if (Object.keys(_color).length) {
      this.colorData = _color
    } else {
      this.allvehicleservice.getColor().subscribe(data => {
        if (data.json().status == true) {
          this.colorData = data.json().result;
          this.completevehicle.addColor(data.json().result)
        } else {
          this.colorData = [];
        }
      });
    }

    let _category = this.completevehicle.getType();
    if (Object.keys(_category).length) {
      this.typeData = _category
    } else {
      this.allvehicleservice.getCategory().subscribe(data => {
        if (data.json().status == true) {
          this.typeData = data.json().result;
          this.completevehicle.addType(data.json().result)
        } else {
          this.typeData = [];
        }
      });
    }

    let _model = this.completevehicle.getModel();
    if (Object.keys(_model).length) {
      this.modelData = _model
    } else {
      this.allvehicleservice.getModel().subscribe(data => {
        if (data.json().status == true) {
          this.modelData = data.json().result;
          this.completevehicle.addModel(data.json().result)
        } else {
          this.modelData = [];
        }
      });
    }

    let _variant = this.completevehicle.getVariant();
    if (Object.keys(_variant).length) {
      this.variantData = _variant
    } else {
      this.allvehicleservice.getVariant().subscribe(data => {
        if (data.json().status == true) {
          this.variantData = data.json().result;
          this.completevehicle.addVariant(data.json().result)
        } else {
          this.variantData = [];
        }
      })
    }

    this.vehicleForm = this.formBuilder.group({
      engineNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      frameNumber: ['', Validators.required],
      vehicleVariant: ['', Validators.required],
      sourcedFrom: ['', Validators.required],
    });

    this.cols = [
      { field: 'TVS-M Invoice No', header: 'Invoice No' },
      { field: 'Sourced from', header: 'Sorce From' },
      { field: 'type_name', header: 'Category' },
      { field: 'model_name', header: 'Model' },
      { field: 'color_name', header: 'Color' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'Engine No', header: 'Engine No' },
      { field: 'Frame No', header: 'Frame No' },
    ];

  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  redirctToAddBulk() {
    this.router.navigate(['inventory/vehicle-details/bulk-import']);
  }

  enableSave() {
    this.disableSave = false;
  }

  get f() { return this.vehicleForm.controls; }

  removeFields() {
    this.submitted = false;
    this.vehicle.invoiceNum = '';
    this.vehicle.sourcedFrom = '';
    this.vehicle.vehicleType = '';
    this.vehicle.vehicleColor = '';
    this.vehicle.vehicleMake = '';
    this.vehicle.vehicleModel = '';
    this.vehicle.vehicleVariant = '';
    this.vehicle.vehicleName = '';
    this.vehicle.engineNum1 = '';
    this.vehicle.engineNum2 = '';
    this.vehicle.gateNumber = '';
    this.vehicle.frameNumber = '';
    this.vehicle.dcNumber = '';
    this.vehicle.status = '';
    this.vehicle.invoiceDate = null;
    this.vehicle.invoiceEditDate = null;
  }

  addVehicle() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    if (this.vehicle.engineNumber) {
      var number = this.vehicle.engineNumber;
      this.vehicle.engineNum1 = number.substring(0, 5);
      this.vehicle.engineNum2 = number.substring(5, 12);
    }
    var data = {
      "TVS-M Invoice No": this.vehicle.invoiceNum,
      "TVS-M Invoice Date": this.vehicle.invoiceDate,
      "Sourced from": this.vehicle.sourcedFrom,
      vehicle_type: this.vehicle.vehicleType,
      vehicle_model: this.vehicle.vehicleModel,
      vehicle_variant: this.vehicle.vehicleVariant,
      vehicle_color: this.vehicle.vehicleColor,
      "Engine No": this.vehicle.engineNumber,
      "Frame No": this.vehicle.frameNumber,
      "Gate Pass": this.vehicle.gateNumber,
      "DC No": this.vehicle.dcNumber,
      "Engine #1": this.vehicle.engineNum1,
      "Engine #2": this.vehicle.engineNum2,
      status: "1"
    }
    // var insertData = {
    //   color_name: this.vehicle.vehicleColor.color_name
    // }
    this.service.addVehicleDetails(data).subscribe(res => {
      if (res.json().status == true) {
        this.bikes.push(res.json().result)
        this.bikes = this.bikes.slice();
        this.notif.success(
          'Success',
          'Vehicle Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addEditVehicle').modal('hide');
    });
  }

  invoiceDateFormat() {
    let newdate2 = moment(this.vehicle.invoiceDate).format('YYYY-MM-DD').toString();
    this.vehicle.invoiceDate = newdate2;
  }

  getInvoiceDate() {
    let newdate3 = new Date(this.vehicle.invoiceEditDate)
    this.updateDate = newdate3.getFullYear() + '-' + (newdate3.getMonth() + 1) + '-' + newdate3.getDate();
  }

  editVehicle(data, index) {
    this.temp = index
    let newDate = moment(data["TVS-M Invoice Date"]).format('DD-MM-YYYY').toString();
    this.vehicle.invoiceEditDate = newDate;
    this.vehicle.vehicleId = data.vehicle_id;
    this.vehicle.invoiceNum = data["TVS-M Invoice No"];
    this.vehicle.sourcedFrom = data["Sourced from"]
    this.vehicle.vehicleType = data.vehicle_type;
    this.vehicle.vehicleModel = data.vehicle_model;
    this.vehicle.vehicleColor = data.vehicle_color;
    this.vehicle.vehicleVariant = data.vehicle_variant;
    this.vehicle.engineNumber = data["Engine No"];
    this.vehicle.frameNumber = data["Frame No"];
    this.vehicle.dcNumber = data["DC No"];
    this.vehicle.gateNumber = data["Gate Pass"];
    this.vehicle.status = data.status;
  }

  updateVehicle() {
    if (this.vehicle.engineNumber) {
      var number = this.vehicle.engineNumber;
      this.vehicle.engineNum1 = number.substring(0, 5);
      this.vehicle.engineNum2 = number.substring(5, 12);
    }
    var data = {
      vehicle_id: this.vehicle.vehicleId,
      "TVS-M Invoice No": this.vehicle.invoiceNum,
      "TVS-M Invoice Date": this.updateDate,
      "Sourced from": this.vehicle.sourcedFrom,
      vehicle_type: this.vehicle.vehicleType,
      vehicle_model: this.vehicle.vehicleModel,
      vehicle_variant: this.vehicle.vehicleVariant,
      vehicle_color: this.vehicle.vehicleColor,
      "Engine No": this.vehicle.engineNumber,
      "Frame No": this.vehicle.frameNumber,
      "Gate Pass": this.vehicle.gateNumber,
      "DC No": this.vehicle.dcNumber,
      "Engine #1": this.vehicle.engineNum1,
      "Engine #2": this.vehicle.engineNum2,
      status: "1"
    }
    this.service.addVehicleDetails(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Vehicle Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addEditVehicle').modal('hide');
      this.bikes[this.temp].vehicle_id = data.vehicle_id;
      this.bikes[this.temp]["TVS-M Invoice No"] = data["TVS-M Invoice No"];
      this.bikes[this.temp]["TVS-M Invoice Date"] = data["TVS-M Invoice Date"];
      this.bikes[this.temp]["Sourced from"] = data["Sourced from"];
      this.bikes[this.temp].vehicle_color = data.vehicle_color;
      this.bikes[this.temp].vehicle_type = data.vehicle_type;
      this.bikes[this.temp].vehicle_model = data.vehicle_model;
      this.bikes[this.temp].vehicle_variant = data.vehicle_variant;
      this.bikes[this.temp]["Frame No"] = data["Frame No"];
      this.bikes[this.temp]["Engine No"] = data["Engine No"];
      this.bikes[this.temp]["DC No"] = data["DC No"];
      this.bikes[this.temp]["Gate Pass"] = data["Gate Pass"];
      this.bikes[this.temp].status = data.status;
      this.temp = " ";
    })
  }

  deleteVehicle(data, index) {
    this.temp1 = index;
    this.vehicle.vehicleId = data.vehicle_id;
  }

  yesVehicle() {
    var data = {
      vehicle_id: this.vehicle.vehicleId,
      status: "0"
    }
    this.service.addVehicleDetails(data).subscribe(res => {
      if (res.json().status == true) {
        this.bikes.splice(this.temp1, 1)
        this.notif.success(
          'Success',
          'Vehicle Deleted Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;
  }

  detailsGo() {
    var url = '';
    if (this.fromDate) {
      url = url + 'startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleTypeFilter != "0") {
      url = url + '&type=' + this.vehicleTypeFilter;
    }
    if (this.vehicleVariantFilter != "0") {
      url = url + '&variant=' + this.vehicleVariantFilter;
    }
    if (this.vehicleModelFilter != "0") {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter != "0") {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    this.service.getVehicleFilter(url).subscribe(res => {
      if (res.json().status == true) {
        this.bikes = res.json().result;
        this.notif.success(
          'Success',
          'Filter Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      else {
        this.bikes = res.json()._body;
        this.notif.warn(
          'Sorry',
          'No Records Found',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }

  detailsReset() {
    this.service.getVehicleDetails().subscribe(res => {
      this.bikes = res.json().result
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Reset Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
    this.vehicleTypeFilter = "0";
    this.vehicleModelFilter = "0";
    this.vehicleColorFilter = "0";
    this.vehicleVariantFilter = "0";
    this.fromDate = " ";
    this.toDate = " ";
  }

  //this method  allow alphabets 
  omit_special_char(event) {
    var k;
    k = event.charCode;  //  k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }
  //This Method  allow Numbers
  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
  //this method allow bothe numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }
}
