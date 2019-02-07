import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';
import { TimeClocksService } from '../services/time-clocks.service'
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  redirect: any = "";
  password = "";
  mailId = "";
  errorMessage = false;
  btnDisable = true;

  constructor(private location: Location, private spinner: NgxSpinnerService, private router: Router, private loginService: LoginService, private service: TimeClocksService) {

    let URL = this.location.path();

    if (URL.search('sale') == 1) {
      this.redirect = "sale";
    }

    // if (URL.search('appt') == 1) {
    //   this.redirect = "appt";
    // }

    if (URL.search('time-clock') == 1) {
      this.redirect = "time-clock";
    }

    // if (URL.search('schedule') == 1) {
    //   this.redirect = "schedule";
    // }

    if (URL.search('report') == 1) {
      this.redirect = "reports";
    }
    if (URL.search('manager') == 1) {
      this.redirect = "manager";
    }
    if (URL.search('inventory') == 1) {
      console.log("inventory")
      this.redirect = "inventory";
    }
    if (URL.search('setup')  == 1) {
      this.redirect = "setup";
    }
  }

  ngOnInit() {
  }

  redirectToDashbaord() {
    this.router.navigate(['sale/dashboard']);
    this.redirect = "sale";
  }

  redirectToReport() {
    $('#secondaryLoginModal').modal('show');
    this.redirect = "reports";
  }

  redirectToTimeClocks() {
    $('#secondaryLoginModal').modal('show')
    this.redirect = "time-clock";
  }

  // redirectToSchedule() {
  //   $('#secondaryLoginModal').modal('show')
  //   this.redirect = "schedule";
  // }

  // redirectToAppointment() {
  //   this.redirect = "appt";
  // }

  redirectToManager() {
    $('#secondaryLoginModal').modal('show');
    this.redirect = "manager";
  }

  redirectToInventory() {
    $('#secondaryLoginModal').modal('show');
    this.redirect = "inventory";
  }

  redirectToSetup() {
    $('#secondaryLoginModal').modal('show');
    this.redirect = "setup";
  }

  redirectToHome() {
    this.router.navigate(['sale']);
  }

  errorClear() {
    this.errorMessage = false;
    if (this.password && this.mailId) {
      this.btnDisable = false;
    }
    else {
      this.btnDisable = true;
    }
  }

  loginSubmite() {
    var data = {
      password: this.password,
      email_id: this.mailId
    }
    sessionStorage.removeItem('setup');
    sessionStorage.removeItem('inventory');
    sessionStorage.removeItem('manager');
    sessionStorage.removeItem('time-clock');
    sessionStorage.removeItem('reports');
    this.spinner.show();
    if (this.mailId && this.password) {
      if (this.redirect == "time-clock") {
        this.service.loginEmployee(data).subscribe(res => {
          this.spinner.hide()
          sessionStorage.setItem('time-clock', JSON.stringify(res.json()));
          this.router.navigate(['time-clock']);
          $('#secondaryLoginModal').modal('hide');
        })
      } else {
        this.loginService.dataLogin(data).subscribe(loginData => {
          if (loginData.json().status == false) {
            this.errorMessage = true;
          } else {
            $('#secondaryLoginModal').modal('hide');
            if (this.redirect == 'setup') {
              sessionStorage.setItem('setup', JSON.stringify(loginData.json()));
              this.router.navigate(['setup'])
              this.spinner.hide()
            } else if (this.redirect == 'inventory') {
              sessionStorage.setItem('inventory', JSON.stringify(loginData.json()));
              console.log("in Inventory")
              this.router.navigate(['inventory/side-bar'])
              this.spinner.hide()
            } else if (this.redirect == 'manager') {
              sessionStorage.setItem('manager', JSON.stringify(loginData.json()));
              this.router.navigate(['manager/side-bar'])
              this.spinner.hide()
            } else if (this.redirect == 'reports') {
              sessionStorage.setItem('reports', JSON.stringify(loginData.json()));
              this.router.navigate(['reports'])
              this.spinner.hide()
            }
            // else if (this.redirect == 'schedule') {
            //   sessionStorage.setItem('schedule', JSON.stringify(loginData.json()));
            //   this.router.navigate(['scheduler'])
            //   this.spinner.hide()
            // }
          }
        });
      }
    }
  }
}
