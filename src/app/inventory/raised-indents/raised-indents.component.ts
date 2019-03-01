import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndentService } from '../../services/indent.service';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'fmyp-raised-indents',
  templateUrl: './raised-indents.component.html',
  styleUrls: ['./raised-indents.component.css'],
  providers: [
    DatePipe
  ]
})
export class RaisedIndentsComponent implements OnInit {

  cols: any[];
  indentData: any[];
  typeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleVariantFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }


  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private service: IndentService, private notif: NotificationsService, private spinner: NgxSpinnerService, private dp: DatePipe) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    // brurl = brurl + '?status=1';
    brurl = brurl + '?branchid=' + loginData._results.employee_branch_id;
    this.spinner.show();
    this.service.getIndentList(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.indentData = res.json().result
      } else {
        this.indentData = [];
      }
      this.spinner.hide();
    })

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

    this.cols = [
      // { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent Req ID' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'req_on_date', header: 'Req. On Date', type: this.dp },
      { field: 'createdemp', header: 'Assigned By' },
      { field: 'Result', header: 'Result'}
    ];
  }

  
  backToInventory() {
    this.router.navigate(['inventory']);
  }

  detailsGo() {
    var url = '';
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    url = url + '?branchid=' + loginData._results.employee_branch_id;
    if (this.fromDate != null) {
      url = url + '&startdate=' + this.fromDate;
    }
    if (this.toDate != null) {
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
    this.service.getIndentList(url).subscribe(res => {
      if (res.json().status == true) {
        this.indentData = res.json().result;
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
        // this.indents = res.json()._body;
        this.indentData = [];
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
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    // brurl = brurl + '?status=1';
    brurl = brurl + '?branchid=' + loginData._results.employee_branch_id;
    this.service.getIndentList(brurl).subscribe(res => {
      this.indentData = res.json().result
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
      } else {
        this.indentData = [];
      }
    });
    this.vehicleTypeFilter = "0";
    this.vehicleModelFilter = "0";
    this.vehicleColorFilter = "0";
    this.vehicleVariantFilter = "0";
    this.fromDate = " ";
    this.toDate = " ";
  }

}
