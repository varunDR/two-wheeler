import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-made',
  templateUrl: './vehicle-made.component.html',
  styleUrls: ['./vehicle-made.component.css']
})
export class VehicleMadeComponent implements OnInit {
  madeData: any = [];
  cols: any = [];
  madeName: '';
  editMadeData: any = [];
  vehicle_make_id: '';
  temp: any;
  make_name: '';
  status: '';
  temp1: any
  typeDeleteData: any = [];

  constructor(private router: Router, private spinner: NgxSpinnerService, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_make_id', header: ' Id' },
      { field: 'make_name', header: ' Name' }
    ];
    this.spinner.show();
    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      if (data.json().status == true) {
        this.madeData = data.json().result;
      } else {
        this.madeData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup/veh-side-bar'])
  }

  addMade() {
    var data = {
      make_name: this.madeName,
      status: 1
    }
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
      this.madeData.push(res.json().result);
      this.madeData = this.madeData.slice();
      $('#addMade').modal('hide');
    })
  }

  removeFields() {
    this.make_name = '';
  }

  editMade(data, index) {
    this.editMadeData = data;
    data.index = index;
    this.temp = index;
    this.vehicle_make_id = this.editMadeData[index].vehicle_make_id;
    this.make_name = this.editMadeData[index].make_name;
    this.status = this.editMadeData[index].status;
  }

  updateMade() {
    var data = {
      vehicle_make_id: this.vehicle_make_id,
      make_name: this.make_name,
      status: this.status
    }
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
      this.editMadeData[this.temp].make_name = data.make_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleMade').modal('hide')
  }

  deleteVehicleMade(val, index) {
    this.temp1 = index;
    this.typeDeleteData = val;
    val.index = index;
    this.vehicle_make_id = this.typeDeleteData[index].vehicle_make_id;
  }

  yesVehicleMade() {
    this.madeData.splice(this.temp1, 1)
    var data = {
      vehicle_make_id: this.vehicle_make_id,
      status: "0"
    }
    this.http.post(environment.host + 'vehicle-makes', data).subscribe(res => {
    })
  }
}
