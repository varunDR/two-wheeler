import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;
import { AllVehicleService } from '../../services/all-vehicle.service';
import { CompleteVehicleService } from '../../services/complete-vehicle.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-finance-names',
  templateUrl: './finance-names.component.html',
  styleUrls: ['./finance-names.component.css']
})
export class FinanceNamesComponent implements OnInit {

  public options = { position: ["top", "right"] }
  financeData: any = []
  cols: any = [];
  editFinanceData: any = [];
  temp: any;
  finance_name_id: '';
  financeName: '';
  status: any;
  temp1: any;
  financedeleteData: any = [];


  constructor(private router: Router, private notif: NotificationsService, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'finance_name', header: 'Name' },
    ];
    this.spinner.show();
    this.allvehicleservice.getFinance().subscribe(data => {
      if (data.json().status == true) {
        this.financeData = data.json().result;
      }else{
        this.financeData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }

  addFinance() {
    var data = {
      finance_name: this.financeName,
      status: 1
    }
    this.allvehicleservice.addFinance(data).subscribe(res => {
      if (res.json().status == true) {
        this.completevehicle.addFinance([])
        this.financeData.push(res.json().result);
        this.financeData = this.financeData.slice();
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
      $('#addNewFinance').modal('hide');
    })
  }

  removeFields() {
    this.financeName = '';
  }

  editFinances(data, index) {
    this.editFinanceData = data;
    data.index = index;
    this.temp = index;
    this.finance_name_id = this.editFinanceData[index].finance_name_id;
    this.financeName = this.editFinanceData[index].finance_name;
    this.status = this.editFinanceData[index].status;
  }

  updateFinance() {
    var data = {
      finance_name_id: this.finance_name_id,
      finance_name: this.financeName,
      status: this.status
    }
    this.allvehicleservice.addFinance(data).subscribe(res => {
      if (res.json().status == true) {
        if (this.status == '0') {
          this.financeData.splice(this.temp, 1)
        }
        this.completevehicle.addFinance([])
        this.notif.success(
          'Success',
          'Finance Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      if(this.status == '1'){
      this.editFinanceData[this.temp].finance_name = data.finance_name;
      }
      this.temp = " ";
    });
    this.removeFields();
    $('#editFinance').modal('hide')
  }

  deleteFinances(val, index) {
    this.temp1 = index;
    this.financedeleteData = val;
    val.index = index;
    this.finance_name_id = this.financedeleteData[index].finance_name_id;
  }

  yesDeleteFinance() {
    var data = {
      finance_name_id: this.finance_name_id,
      status: "0"
    }
    this.allvehicleservice.addFinance(data).subscribe(res => {
      if (res.json().status == true) {
        this.financeData.splice(this.temp1, 1)
        this.completevehicle.addFinance([])
        this.notif.success(
          'Success',
          'Fianance Deleted Successfully',
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
