import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-discount-otp-no',
  templateUrl: './discount-otp-no.component.html',
  styleUrls: ['./discount-otp-no.component.css']
})
export class DiscountOtpNoComponent implements OnInit {

  numbersData: any = []
  cols: any = [];
  editNumberData: any = [];
  temp: any;
  discountsendotp_id: '';
  name: '';
  number: '';
  status: any;
  temp1: any;
  modeldeleteData: any = [];
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private notif: NotificationsService, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: ' Name' },
      { field: 'number', header: 'No.' }
    ];
    this.spinner.show();
    this.allvehicleservice.getOtpNumbers().subscribe(data => {
      if (data.json().status == true) {
        this.numbersData = data.json().result;
      }else{
        this.numbersData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }

  addNumber() {
    var data = {
      name: this.name,
      number: this.number,
      status: 1
    }
    this.allvehicleservice.addOtpNumber(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addNumbers([])
        this.numbersData.push(res.json().result);
        this.numbersData = this.numbersData.slice();
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
    this.name = '';
    this.number = '';
  }

  editNumbers(data, index) {
    this.editNumberData = data;
    data.index = index;
    this.temp = index;
    this.discountsendotp_id = this.editNumberData[index].discountsendotp_id;
    this.name = this.editNumberData[index].name;
    this.number = this.editNumberData[index].number;
    this.status = this.editNumberData[index].status;
  }

  updateNumber() {
    var data = {
      discountsendotp_id: this.discountsendotp_id,
      name: this.name,
      number: this.number,
      status: this.status
    }
    this.allvehicleservice.addOtpNumber(data).subscribe(res => {
      if (res.json().status == true) {
        if (this.status == '0') {
          this.numbersData.splice(this.temp, 1)
        }
        this.completevehicle.addNumbers([])
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
      this.editNumberData[this.temp].name = data.name;
      this.editNumberData[this.temp].number = data.number;

      this.temp = " ";
    });
    this.removeFields();
    $('#editNumberModel').modal('hide')
  }

  deleteNumber(val, index) {
    this.temp1 = index;
    this.modeldeleteData = val;
    val.index = index;
    this.discountsendotp_id = this.modeldeleteData[index].discountsendotp_id;
  }

  yesDeleteModel() {
    var data = {
      discountsendotp_id: this.discountsendotp_id,
      status: "0"
    }
    this.allvehicleservice.addOtpNumber(data).subscribe(res => {
      if (res.json().status == true) {
        this.numbersData.splice(this.temp1, 1)
        this.completevehicle.addNumbers([])
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
