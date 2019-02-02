import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { LoginService } from '../../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fmyp-setup-sidebar',
  templateUrl: './setup-sidebar.component.html',
  styleUrls: ['./setup-sidebar.component.css']
})
export class SetupSidebarComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService, private loginservice: LoginService) { }

  ngOnInit() {
  }

  redirectToBranch() {
    this.router.navigate(['setup/branch'])
  }
  redirectToVehicle() {
    this.router.navigate(['setup/veh-side-bar'])
  }
  redirectToPriceList() {
    this.router.navigate(['setup/price-list'])
  }
  redirectToSendOTPNo(){
    this.router.navigate(['setup/send-otp-no'])    
  }
  redirectToFinance(){
    this.router.navigate(['setup/finance-name'])    
  }
  redirectToWallet(){
    this.router.navigate(['setup/wallet'])    
  }
}
