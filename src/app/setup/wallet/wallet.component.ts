import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { SetupServiceService } from '../../services/setup-service.service'
declare var $: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  walletData: any = [];
  cols: any[];
  wallet: any = {
    'walId': '',
    'name': '',
    'status': ''
  }
  addEnableorDisable = 'visible';
  updateEnableorDisable = 'visible'
  editData: any = [];
  deleteData: any = [];
  temp: any;
  temp1: any;

  constructor(private router: Router, private spinner: NgxSpinnerService, private notif: NotificationsService, private setupservice: SetupServiceService) { }

  ngOnInit() {
    this.spinner.show();
    this.setupservice.getWallet().subscribe(res => {
      if (res.json().status == true) {
        this.walletData = res.json().result;
      } else {
        this.walletData = [];
      }
      this.spinner.hide();
    });
    this.cols = [
      { field: 'payment_name', header: 'Wallet Name' }
    ];
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }

  removeFields() {
    this.updateEnableorDisable = 'hidden';
    this.addEnableorDisable = 'visible';
    this.wallet.name = ' ';
  }

  addWallets() {
    var data = {
      payment_name: this.wallet.name,
      payment_status: 1
    }
    this.setupservice.saveWallet(data).subscribe(res => {
      if (res.json().status == true) {
        this.walletData.push(res.json().result);
        this.walletData = this.walletData.slice();
        this.notif.success(
          'Success',
          'Wallet Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addWallet').modal('hide');
    });
  }

  editWallets(data, index) {
    console.log(data)
    this.addEnableorDisable = 'hidden';
    this.updateEnableorDisable = 'visible'
    this.editData = data;
    data.index = index;
    this.temp = index;
    this.wallet.walId = this.editData[index].payment_type_id,
      this.wallet.name = this.editData[index].payment_name,
      this.wallet.status = this.editData[index].payment_status
  }

  updateWallets() {
    var data = {
      payment_type_id: this.wallet.walId,
      payment_name: this.wallet.name,
      payment_status: this.wallet.status
    }
    this.setupservice.saveWallet(data).subscribe(res => {
      this.walletData[this.temp].payment_type_id = data.payment_type_id,
        this.walletData[this.temp].payment_name = data.payment_name,
        this.walletData[this.temp].payment_status = data.payment_status,
        this.temp = " "
    });
    $('#addWallet').modal('hide')
  }

  deleteWallets(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.wallet.walId = this.deleteData[index].payment_type_id;
  }

  yesWalletDelete() {
    var data = {
      payment_type_id: this.wallet.walId,
      payment_status: "0"
    }
    this.setupservice.saveWallet(data).subscribe(res => {
      if (res.json().status == true) {
        this.walletData.splice(this.temp1, 1)
        this.notif.success(
          'Success',
          'Wallet Deleted Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
        // this.walletData = this.walletData.slice();
      }
    })
  }

}
