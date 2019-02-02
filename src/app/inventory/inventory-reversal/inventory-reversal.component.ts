import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ReversalInventoryService } from '../../services/reversal-inventory.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { SetupServiceService } from '../../services/setup-service.service';


@Component({
  selector: 'app-inventory-reversal',
  templateUrl: './inventory-reversal.component.html',
  styleUrls: ['./inventory-reversal.component.css']
})
export class InventoryReversalComponent implements OnInit {

  InventoryReversalForm: FormGroup;
  branchData: any = [];
  typeData: any = [];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  public options = { position: ["top", "right"] }
  submitted = false;

  reversal: any = {
    'branchId': '',
    'vehicleType': '',
    'vehicleModel': '',
    'vehicleVariant': '',
    'vehicleColor': '',
    'reqQuantity': '',
    'reqDate': ''
  }

  constructor(private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private formBuilder: FormBuilder, private notif: NotificationsService, private router: Router, private reverseservice: ReversalInventoryService, private setupservice:SetupServiceService) {
    // this.dateTime.setDate(this.dateTime.getDate() - 3); 
  }

  ngOnInit() {
    this.setupservice.getBranch().subscribe(res => {
      if (res.json().status == true) {
        this.branchData = res.json().result;
      } else {
        this.branchData = [];
      }
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

    this.InventoryReversalForm = this.formBuilder.group({
      branchId: ['', Validators.required],
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

  get f() { return this.InventoryReversalForm.controls; }

  addReversal() {
    this.submitted = true;
    if (this.InventoryReversalForm.invalid) {
      return;
    }
    var data = {
      branch_id: this.reversal.branchId,
      veh_color: this.reversal.vehicleColor,
      veh_type: this.reversal.vehicleType,
      veh_variant: this.reversal.vehicleVariant,
      veh_model: this.reversal.vehicleModel,
      req_qty: this.reversal.reqQuantity,
      req_on_date: this.reversal.reqDate,
      status: "1"
    }
    this.reverseservice.addReversalInventory(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Reversal Raised Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.clearForm()
    })
  }

  clearForm() {
    this.reversal.branchId = " ";
    this.reversal.vehicleColor = " ";
    this.reversal.vehicleModel = " ";
    this.reversal.vehicleType = " "
    this.reversal.vehicleVariant = " "
    this.reversal.reqQuantity = " "
    this.reversal.reqDate = null
  }

  getreqDate() {
    let newDate = moment(this.reversal.reqDate).format('YYYY-MM-DD').toString();
    this.reversal.reqDate = newDate;
  }

  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }
}