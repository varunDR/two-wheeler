import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { NotificationsService } from 'angular2-notifications';
import { AllVehicleService } from '../../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  typeData: any = [];
  cols: any = [];
  typeName: '';
  editTypeData: any = []
  temp: any;
  type_name: '';
  vehicle_type_id: '';
  status: '';
  temp1: any
  typeDeleteData: any = [];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'type_name', header: ' Name' }
    ];
    this.spinner.show();
    this.allvehicleservice.getCategory().subscribe(data => {
      if (data.json().status == true) {
        this.typeData = data.json().result;
      } else {
        this.typeData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup/veh-side-bar'])
  }
  addType() {
    var data = {
      type_name: this.typeName,
      status: 1
    }
    this.allvehicleservice.addCategory(data).subscribe(res => {
      if (res.json().status == true) {
        this.typeData.push(res.json().result);
        this.typeData = this.typeData.slice();
        this.completevehicle.addType([])
        this.notif.success(
          'Success',
          'Type Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addType').modal('hide');
    })
  }

  removeFields() {
    this.typeName = '';
  }

  editType(data, index) {
    this.editTypeData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_type_id = this.editTypeData[index].vehicle_type_id;
    this.type_name = this.editTypeData[index].type_name;
    this.status = this.editTypeData[index].status
  }

  updateType() {
    var data = {
      vehicle_type_id: this.vehicle_type_id,
      type_name: this.type_name,
      status: this.status
    }
    this.allvehicleservice.addCategory(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addType([])
        this.notif.success(
          'Success',
          'Type Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.editTypeData[this.temp].type_name = data.type_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleType').modal('hide')

  }
  deleteVehicleType(val, index) {
    this.temp1 = index;
    this.typeDeleteData = val;
    val.index = index;
    this.vehicle_type_id = this.typeDeleteData[index].vehicle_type_id;
  }
  yesVehicleType() {
    var data = {
      vehicle_type_id: this.vehicle_type_id,
      status: "0"
    }
    this.allvehicleservice.addCategory(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addType([])
        this.typeData.splice(this.temp1, 1)
        this.notif.success(
          'Success',
          'Type Deleted Successfully',
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
