import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import { InventoryAddPipe } from '../../pipe/inventory-add.pipe';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { IndentService } from '../../services/indent.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;
import { Observable, of } from 'rxjs';
// import { Observable } from 'rxjs'

@Component({
  selector: 'app-inventory-assigning',
  templateUrl: './inventory-assigning.component.html',
  styleUrls: ['./inventory-assigning.component.css']
})
export class InventoryAssigningComponent implements OnInit {
  indentData: any = [];
  branchData: any = [];
  employeedata: any = [];
  InventoryAssignForm: FormGroup;
  submitted = false;
  isCheckAssignQty: boolean;
  indentId = '';
  branchId = '';
  empId = '';
  generatedShippedId: any = '';
  shippedBy = '';
  shippedIn = '';
  managerAck = '';
  managerNote = '';
  status = '';
  assQuantity: any;
  assDate = '';
  updateBy = '';
  updateDate = '';
  loginData: any;
  _indentData: any;
  newDate: any;
  newDate2: any;
  public options = { position: ["top", "right"] }
  colorData: any[];
  // vechiles: any[];
  cols: any[];
  variantData: any[];
  selectedColorFilter = undefined;
  selectedVariantFilter = undefined;
  _selectVec: any = [];
  vechilesDetail: any = [];
  vehicles: any = [
    {
      engineno: "",
      chassisno: "",
      frameno: "",
      color: "",
      variant: "",
      model: "",
    }
  ];
  constructor(private router: Router, private http: Http, private service: InventoryAssigningService, private formBuilder: FormBuilder, private pipe: InventoryListPipe, private addInvPipe: InventoryAddPipe, private notif: NotificationsService, private indentservice: IndentService, private spinner: NgxSpinnerService, private completevehicle: CompleteVehicleService, private allvehicleservice: AllVehicleService) {
  }
  ngOnInit() {
    this.spinner.show();
    this.allvehicleservice.getVehicleDetails().subscribe(res => {
      if (res.json().status == true) {
        this.vechilesDetail = res.json().result
      } else {
        this.vechilesDetail = [];
      }
      this.spinner.hide();
    });

    this._indentData = JSON.parse(sessionStorage.getItem('indentData'));
    if (this._indentData) {
      this.branchId = this._indentData.br_id;
      this.indentId = this._indentData.indent_id;
      setTimeout(() => {
        this.shippedBy = this._indentData.shipped_by;
        this.shippedIn = this._indentData.shipped_vechile_no;
        this.status = '1';
      }, 1);
      this.assQuantity = this._indentData.assigned_qty
    }
    this.http.get(environment.host + 'indents').subscribe(res => {
      if (res.json().status == true) {
        this.indentData = res.json().result;
      } else {
        this.indentData = [];
      }
    });
    this.http.get(environment.host + 'branches').subscribe(res => {
      if (res.json().status == true) {
        this.branchData = res.json().result;
      } else {
        this.branchData = [];
      }
    });
    this.http.get(environment.host + 'employees').subscribe(res => {
      if (res.json().status == true) {
        this.employeedata = res.json().result;
      } else {
        this.employeedata = [];
      }
    });

    this.InventoryAssignForm = this.formBuilder.group({
      // indentId: ['', Validators.required],
      branchId: ['', Validators.required],
      shippedBy: ['', Validators.required],
      shippedIn: ['', Validators.required],
      assQuantity: ['', Validators.required],
      managerAck: ['', Validators.required],
      managerNote: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.cols = [
      { field: 'TVS-M Invoice No', header: 'Invoice No' },
      { field: 'Sourced from', header: 'Sorce From' },
      { field: 'model_name', header: 'Model' },
      { field: 'color_name', header: 'Color' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'Engine No', header: 'Engine No' },
      { field: 'Frame No', header: 'Frame No' },
    ];
  }

  // deleteInventoryAssign(index) {
  //   this.vehicles.splice(index, 1)
  // }

  // addInventoryAssign(data, index) {
  //   this.vehicles.push({
  //     engineno: "",
  //     frameno: "",
  //     color: "",
  //     variant: "",
  //     model: ""
  //   })
  // }

  backToInventory() {
    this.router.navigate(['inventory']);
  }
  getassDate() {
    let newDate1 = moment(this.assDate).format('YYYY-MM-DD').toString();
    this.assDate = newDate1;
  }
  getupdDate() {
    let newDate2 = moment(this.updateDate).format('YYYY-MM-DD').toString();
    this.updateDate = newDate2;
  }
  selectedValue: string;
  temp: any[] = new Array();
  noResult = false;
  selectedOption: any = '';
  assignIndex: any;

  getEngineDetail(val, index) {
    this.assignIndex = index;
    if (val.length >= 3) {
      this.http.get(environment.host + 'get-engine-details/' + val).subscribe(data => {
        if (data.json().status == false) {
          this.noResult = true;
        } else {
          this.noResult = false;
          // this.indentData = this.temp.pop();
          // this.vehicles[index].engineno = data.json().result[0]["Engine No"];
          // this.vehicles[index].color = data.json().result[0].color_name;
          // this.vehicles[index].frameno = data.json().result[0]["Frame No"];
          // this.vehicles[index].chassisno = data.json().result[0]["Frame No"];
          // this.vehicles[index].variant = data.json().result[0].variant_name;
          // this.vehicles[index].model = data.json().result[0].model_name;
          // this.vehicles[index].vechile_id = data.json().result[0].vehicle_id;
          // this.vehicles[index].vehicle_color_id = data.json().result[0].vehicle_color;
          // this.vehicles[index].vehicle_model_id = data.json().result[0].vehicle_model;
          // this.vehicles[index].vehicle_variant_id = data.json().result[0].vehicle_variant;
        }
      })
    } else {
      this.noResult = false;
      this.indentData = [];
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  get f() { return this.InventoryAssignForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.InventoryAssignForm.invalid) {
      return;
    }
    if (!this.isCheckAssignQty) {
      return;
    }
    this.generatedShippedId = Math.floor(Math.random() * 899999 + 100000);
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    var data: any = {
      indent_id: this.indentId,
      branch_id: this.branchId,
      shipped_by: this.shippedBy,
      shipped_vechile_no: this.shippedIn,
      assign_qty: this.assQuantity,
      br_mgr_ack: this.managerAck,
      br_mgr_comment: this.managerNote,
      generated_shipping_id: this.generatedShippedId,
      status: this.status,
      vechile_details: JSON.stringify(this.vehicles)
    }
    var finalData = this.addInvPipe.transform(data);
    this.service.addInventoryAssign(finalData).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Inventory Assigned Successfully',
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
    if (this._indentData) {
      this.indentservice.addIndent({ indent_id: this.indentId, status: "0" }).subscribe(res => { })
    }
  }
  omit_special_char(event) {
    var k = event.charCode;  //  k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }
  //This Method  allow Numbers
  only_allow_number(event) {
    var n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
  //this method allow bothe numbers and alphabets
  allow_numbers_alphabets(event) {
    var a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || a == 32 || (a >= 48 && a <= 57));
  }

  getVechicleDetail() {
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
  }

  detailsGo() {
    var url = '';
    if (!(isNaN(this.selectedVariantFilter))) {
      url = url + '&variant=' + this.selectedVariantFilter;
    }
    if (!(isNaN(this.selectedColorFilter))) {
      url = url + '&color=' + this.selectedColorFilter;
    }
    this.allvehicleservice.getVehicleFilter(url).subscribe(res => {
      if (res.json().status == true) {
        this.vechilesDetail = res.json().result;
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
      } else {
        this.vechilesDetail = [];
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
    this.selectedVariantFilter = undefined;
    this.selectedColorFilter = undefined;
  }
  selectedSubmite() {
    $('#showVechileDetail').modal('hide');
    let count = 0;
    this.vechilesDetail.forEach((val, key, arr) => {
      if (val.check) {
        count++;
        this.vehicles[key] = val;
      }
      if (Object.is(arr.length - 1, key)) {
        if (count == this.assQuantity) {
          this.isCheckAssignQty = true;
        } else {
          this.notif.error(
            'Error',
            'Assign Require Quantity',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
          this.isCheckAssignQty = false;
        }
      }
    });
  }
  selectedVechile(val) {
    // this._selectVec.push(val);
    // console.log(this._selectVec)

  }
  assignVechileCount() {
    if (!(isNaN(this.assQuantity))) {
      if (this.assQuantity > 0) {
        this.vehicles = [];
        for (let i = 0; i < this.assQuantity; i++) {
          this.vehicles.push({
            engineno: "",
            frameno: "",
            color: "",
            variant: "",
            model: "",
            vehicle_color: ""
          })
        }
      }
    }

  }
}
