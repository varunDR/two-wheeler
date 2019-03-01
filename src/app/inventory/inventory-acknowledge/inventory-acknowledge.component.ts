import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { InventoryListPipe } from '../../pipe/inventory-list.pipe';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-inventory-acknowledge',
  templateUrl: './inventory-acknowledge.component.html',
  styleUrls: ['./inventory-acknowledge.component.css']
})
export class InventoryAcknowledgeComponent implements OnInit {

  inventoryData: any[];
  cols: any[];
  typeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];
  temp: any;

  inventory: any = {
    'status': '',
    'inventoryAssignId': '',
    'branchName': ''
  }
  //reject vehicle
  rejectList: any = {
    'inventory_assign_id': '',
    'engineno': '',
    'frameno': '',
    'model_name': '',
    'variant_name': '',
    'color_name': '',
    'reject_comment': ''
  }

  //vehicleTypeFilter = "";
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleMakeFilter = "";
  fromDate = "";
  toDate = "";
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private service: InventoryAssigningService, private invAssignService: InventoryListPipe, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.spinner.show();
    this.service.getAcknowledgeList(brurl).subscribe(res => {
      if (res.json().status == true) {
        //this.inventoryData = this.invAssignService.transform(res.json().result);
        this.inventoryData = res.json().result
      } else {
        this.inventoryData = [];
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

    this.cols = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'shipped_vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' }
    ];
  }

  backToInventory() {
    this.router.navigate(['inventory']);
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
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    console.log(loginData)
    var url = '';
    url = url + '&branchid=' + loginData._results.employee_branch_id;
    if (this.fromDate) {
      url = url + 'startdate=' + this.fromDate;
    }
    if (this.toDate) {
      url = url + '&enddate=' + this.toDate;
    }
    if (this.vehicleMakeFilter != "0") {
      url = url + '&variant=' + this.vehicleMakeFilter;
    }
    if (this.vehicleModelFilter != "0") {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter != "0") {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    this.service.getAcknowledgeList(url).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
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
        this.inventoryData = [];
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
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.service.getAcknowledgeList(brurl).subscribe(res => {
      this.inventoryData = res.json().result
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
    //this.vehicleTypeFilter = " ";
    this.vehicleModelFilter = "0";
    this.vehicleColorFilter = "0";
    this.vehicleMakeFilter = "0";
    this.fromDate = " ";
    this.toDate = " ";
  }

  yesAcknowledgement(data, index) {
    this.inventory.inventoryAssignId = data.inventory_assign_id;
    var val = {
      inventory_assign_id: this.inventory.inventoryAssignId,
      status: "2"
    }
    this.service.addInventoryAssign(val).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData.splice(index, 1)
        this.notif.success(
          'Success',
          'Added Successfully',
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
  }

  rejectVehicleClick(data, index) {
    this.temp = index;
    this.rejectList = data;
  }


  noAcknowledgement() {
    var data = {
      inventory_assign_id: this.rejectList.inventory_assign_id,
      status: "0",
      reject_comment: this.rejectList.reject_comment
    }
    this.service.addInventoryAssign(data).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData.splice(this.temp, 1)
        $('#rejectVehicles').modal('hide');
        this.notif.alert(
          'Error',
          'Rejected Successfully',
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
  }
}
