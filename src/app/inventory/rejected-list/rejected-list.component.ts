import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { CompleteVehicleService } from '../../services/complete-vehicle.service';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.css']
})
export class RejectedListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];
  vehicleModelFilter = "";
  vehicleColorFilter = "";
  vehicleVariantFilter = "";
  vehicleBranchFilter = "";
  modelData: any[];
  colorData: any[];
  variantData: any[];
  brData: any;

  constructor(private router: Router, private http: Http, private notif: NotificationsService, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private spinner: NgxSpinnerService, private service: InventoryAssigningService, ) { }

  ngOnInit() {
    var url = ''
    this.spinner.show();
    this.service.getRejectedList(url).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      } else {
        this.inventoryData = [];
      }
      this.spinner.hide();
    });

    this.cols = [
      { field: 'engineno', header: 'Engine No' },
      { field: 'frameno', header: 'Frame No' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'branch_name', header: 'Rejected By' },
      { field: 'reject_comment', header: 'Comment' }

    ];

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

    this.http.get(environment.host + 'branches').subscribe(data => {
      if (data.json().status == true) {
        this.brData = data.json().result;
      } else {
        this.brData = [];
      }
    });
  }

  backToInventory() {
    this.router.navigate(['inventory']);
  }

  detailsGo() {
    var url = '';
    if (this.vehicleVariantFilter != "0") {
      url = url + '&variant=' + this.vehicleVariantFilter;
    }
    if (this.vehicleModelFilter != "0") {
      url = url + '&model=' + this.vehicleModelFilter;
    }
    if (this.vehicleColorFilter != "0") {
      url = url + '&color=' + this.vehicleColorFilter;
    }
    if (this.vehicleBranchFilter != "0") {
      url = url + '&branchid=' + this.vehicleBranchFilter;
    }
    console.log(url)

    this.service.getRejectedList(url).subscribe(res => {
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
      } else {
        this.inventoryData = [];
        this.notif.warn(
          'OOPS',
          'NO Records Found',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          })
      }
    })
  }
  detailsReset() {
    var url = ''
    this.spinner.show();
    this.service.getRejectedList(url).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.inventoryData = res.json().result
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
        this.inventoryData = [];
      }
    });
    this.vehicleBranchFilter ="0";
    this.vehicleModelFilter = "0";
    this.vehicleColorFilter = "0";
    this.vehicleVariantFilter = "0";
  }
}
