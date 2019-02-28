import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndentService } from '../../services/indent.service'
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indent-list',
  templateUrl: './indent-list.component.html',
  styleUrls: ['./indent-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class IndentListComponent implements OnInit {
  indents: any[];
  cols: any[];

  typeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  shipId: any;
  vehicleTypeFilter = "0";
  vehicleModelFilter = "0";
  vehicleColorFilter = "0";
  vehicleVariantFilter = "0";
  fromDate = "";
  toDate = "";

  editData: any = [];
  temp: any;
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private service: IndentService, private dp: DatePipe, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.spinner.show();
    this.service.getIndentList(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.indents = res.json().result
      } else {
        this.indents = [];
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
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent Req ID' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'req_on_date', header: 'Req. On Date', type: this.dp },
      { field: 'createdemp', header: 'Assaigned By' },
    ];
  }

  fromDa() {
    let newDate = moment(this.fromDate).format('YYYY-MM-DD').toString();
    this.fromDate = newDate;
  }

  toDa() {
    let newDate1 = moment(this.toDate).format('YYYY-MM-DD').toString();
    this.toDate = newDate1;
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  indent: any = {
    'indentId': '',
    'indentReqId': '',
    'empId': '',
    'brId': '',
    'vehColor': '',
    'vehType': '',
    'vehVariant': '',
    'vehModel': '',
    'reqQty': '',
    'assignedQty': '',
    'reqOnDate': '',
    'assignedOn': '',
    'assignedBy': '',
    'status': '',
    'shipping_status': '',
    'shippedVechileNo': '',
    'shippedBy': ''
  }

  editIndent(data, index) {
    console.log(data)
    this.temp = index;
    this.indent.indentId = data.indent_id
    this.indent.indentReqId = data.indent_req_id;
    this.indent.empId = data.emp_id;
    this.indent.brId = data.br_id;
    this.indent.vehColor = data.veh_color;
    this.indent.vehType = data.veh_type;
    this.indent.vehVariant = data.veh_variant;
    this.indent.vehModel = data.veh_model;
    this.indent.reqQty = data.req_qty;
    this.indent.assignedQty = data.assigned_qty;
    this.indent.reqOnDate = data.req_on_date;
    this.indent.assignedOn = data.assigned_on;
    this.indent.shipping_status = data.shipping_status;
    this.indent.shippedVechileNo = data.shipped_vechile_no;
    this.indent.shippedBy = data.shipped_by;
    this.indent.status = data.status;
    this.indent.assignedBy = data.assigned_by;
    this.shipId = "SHP" + Math.floor(Math.random() * 899999 + 100000);
  }

  updateIndent() {
    console.log(this.indent.shipping_status)
    if (this.indent.shipping_status == 0) {
      var data = {
        indent_id: this.indent.indentId,
        indent_req_id: this.indent.indentReqId,
        emp_id: this.indent.empId,
        br_id: this.indent.brId,
        veh_type: this.indent.vehType,
        veh_color: this.indent.vehColor,
        veh_variant: this.indent.vehVariant,
        veh_model: this.indent.vehModel,
        req_qty: this.indent.reqQty,
        assigned_qty: this.indent.assignedQty,
        shippind_id: this.shipId,
        shipped_by: this.indent.shippedBy,
        shipped_vechile_no: this.indent.shippedVechileNo,
        shipping_status: this.indent.status,
        status: "1"
      }
      this.service.addIndent(data).subscribe(res => {
        if (res.json().status == true) {
          this.notif.success(
            'Success',
            'Indent Updated Successfully',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
          sessionStorage.setItem('indentData', JSON.stringify(this.indents[this.temp]))
          setTimeout(() => {
            this.router.navigate(['inventory/inventory-assigning']);
          }, 1000);
        }
      })
    } else {
      var data1 = {
        indent_id: this.indent.indentId,
        status: "2"
      }
      this.indents.splice(this.temp, 1)
      this.service.addIndent(data1).subscribe(res => {
        if (res.json().status == true) {
          this.notif.alert(
            'Error',
            'Indent Rejected Successfully',
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

  }

  detailsGo() {
    var url = '';
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    url = url + '&branchid=' + loginData._results.employee_branch_id;
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
    this.service.getIndentFilter(url).subscribe(res => {
      if (res.json().status == true) {
        this.indents = res.json().result;
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
        this.indents = [];
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
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getIndentList(brurl).subscribe(res => {
      this.indents = res.json().result
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
        this.indents = [];
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
