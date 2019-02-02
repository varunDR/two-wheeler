import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;
import { AllVehicleService } from '../../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../../services/complete-vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.css']
})
export class VehicleModelComponent implements OnInit {
  modelData: any = [];
  cols: any = [];
  modelName: '';
  editModelData: any = [];
  temp: any;
  vehicle_model_id: '';
  model_name: '';
  status: '';
  temp1: any;
  modeldeleteData: any = [];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private notif: NotificationsService, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'model_name', header: ' Name' }
    ];
    this.spinner.show();
    this.allvehicleservice.getModel().subscribe(data => {
      if (data.json().status == true) {
        this.modelData = data.json().result;
      } else {
        this.modelData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup/veh-side-bar'])
  }

  addModel() {
    var data = {
      model_name: this.modelName,
      status: 1
    }
    this.allvehicleservice.addModel(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addModel([])
        this.modelData.push(res.json().result);
        this.modelData = this.modelData.slice();
        this.notif.success(
          'Success',
          'Model Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addNewModel').modal('hide');
    })
  }

  removeFields() {
    this.model_name = '';
  }

  editModel(data, index) {
    this.editModelData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_model_id = this.editModelData[index].vehicle_model_id;
    this.model_name = this.editModelData[index].model_name;
    this.status = this.editModelData[index].status;
  }

  updateModel() {
    var data = {
      vehicle_model_id: this.vehicle_model_id,
      model_name: this.model_name,
      status: this.status
    }
    this.allvehicleservice.addModel(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addModel([])
        this.notif.success(
          'Success',
          'Model Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.editModelData[this.temp].model_name = data.model_name;
      this.temp = " ";
    });
    this.removeFields();
    $('#editVehicleModel').modal('hide')
  }

  deleteModel(val, index) {
    this.temp1 = index;
    this.modeldeleteData = val;
    val.index = index;
    this.vehicle_model_id = this.modeldeleteData[index].vehicle_model_id;
  }

  yesDeleteModel() {
    var data = {
      vehicle_model_id: this.vehicle_model_id,
      status: "0"
    }
    this.allvehicleservice.addModel(data).subscribe(res => {
      if (res.json().status == true) {
        this.modelData.splice(this.temp1, 1)
        this.completevehicle.addModel([])
        this.notif.success(
          'Success',
          'Model Deleted Successfully',
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
