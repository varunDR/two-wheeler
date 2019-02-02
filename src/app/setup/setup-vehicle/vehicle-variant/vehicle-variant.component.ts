import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
declare var $: any;
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../../services/complete-vehicle.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-variant',
  templateUrl: './vehicle-variant.component.html',
  styleUrls: ['./vehicle-variant.component.css']
})
export class VehicleVariantComponent implements OnInit {
  variantData: any = [];
  cols: any = [];
  variantName: '';
  editVariantData: any = []
  temp: any;
  variant_name: '';
  vehicle_variant_id: '';
  status: '';
  temp1: any;
  variantDeleteData: any = [];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private spinner: NgxSpinnerService, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private notif: NotificationsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'variant_name', header: 'Variant' }
    ];
    this.spinner.show();
    this.allvehicleservice.getVariant().subscribe(data => {
      if (data.json().status == true) {
        this.variantData = data.json().result;
      } else {
        this.variantData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup/veh-side-bar'])
  }

  addVariant() {
    var data = {
      variant_name: this.variantName,
      status: 1
    }
    this.allvehicleservice.addVariant(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addVariant([])
        this.variantData.push(res.json().result);
        this.variantData = this.variantData.slice();
        this.notif.success(
          'Success',
          'Variant Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addVariant').modal('hide');
    })
  }

  removeFields() {
    this.variant_name = '';
  }

  editVariant(data, index) {
    this.editVariantData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_variant_id = this.editVariantData[index].vehicle_variant_id;
    this.variant_name = this.editVariantData[index].variant_name;
    this.status = this.editVariantData[index].status
  }

  updateVariant() {
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      variant_name: this.variant_name,
      status: this.status
    }
    this.allvehicleservice.addVariant(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addVariant([])
        this.notif.success(
          'Success',
          'Variant Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.editVariantData[this.temp].variant_name = data.variant_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleVariant').modal('hide')
  }

  deleteVariant(val, index) {
    this.temp1 = index;
    this.variantDeleteData = val;
    val.index = index;
    this.vehicle_variant_id = this.variantDeleteData[index].vehicle_variant_id;
  }

  yesVehicleVariant() {
    var data = {
      vehicle_variant_id: this.vehicle_variant_id,
      status: "0"
    }
    this.allvehicleservice.addVariant(data).subscribe(res => {
      if (res.json().status == true) {
        this.variantData.splice(this.temp1, 1)
        this.completevehicle.addVariant([])
        this.notif.success(
          'Success',
          'Variant Deleted Successfully',
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
