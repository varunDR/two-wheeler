import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndentService } from '../../services/indent.service'
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indent-raising',
  templateUrl: './indent-raising.component.html',
  styleUrls: ['./indent-raising.component.css']
})
export class IndentRaisingComponent implements OnInit {
  public date1: any;

  IndentRaisingForm: FormGroup;
  submitted = false;

  indent:any={
  'indentId': '',
  'vehicleColor' : '',
  'vehicleModel' : '',
  'vehicleType' : '',
  'vehicleVariant' : '',
  'reqQuantity' : '',
  'reqDate' : ''
  }

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private service: IndentService, private formBuilder: FormBuilder, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
      this.spinner.show();
      this.allvehicleservice.getVariant().subscribe(data => {
        if (data.json().status == true) {
          this.variantData = data.json().result;
          this.completevehicle.addVariant(data.json().result)
        } else {
          this.variantData = [];
        }
        this.spinner.hide();
      })
    }

    this.IndentRaisingForm = this.formBuilder.group({
      vehicleColor: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleVariant: ['', Validators.required],
      reqQuantity: ['', Validators.required],
    });
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  get f() { return this.IndentRaisingForm.controls; }

  addIndent() {
    this.submitted = true;
    if (this.IndentRaisingForm.invalid) {
      return;
    }
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    this.indent.indentId = "IND" + Math.round((Math.random() * 36 ** 7)).toString(36);
    var data = {
      indent_req_id: this.indent.indentId,
      emp_id: loginData._results.employee_id,
      br_id: loginData._results.employee_branch_id,
      veh_color: this.indent.vehicleColor,
      veh_type: this.indent.vehicleType,
      veh_variant: this.indent.vehicleVariant,
      veh_model: this.indent.vehicleModel,
      req_qty: this.indent.reqQuantity,
      req_on_date: this.indent.reqDate,
      assigned_by: loginData._results.employee_id,
      updated_by: loginData._results.employee_id,
      status: "1"
    }
    this.service.addIndent(data).subscribe(res => {
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
          }
        )
      }
      this.cancelIndent()
    })
  }

  getreqDate() {
    let newDate = moment(this.indent.reqDate).format('YYYY-MM-DD').toString();
    this.indent.reqDate = newDate;
  }

  cancelIndent() {
    this.indent.indentId = " ";
    this.indent.vehicleColor = " ";
    this.indent.vehicleModel = " ";
    this.indent.vehicleType = " "
    this.indent.vehicleVariant = " "
    this.indent.reqQuantity = " "
    this.indent.reqDate = null
  }

  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
}
