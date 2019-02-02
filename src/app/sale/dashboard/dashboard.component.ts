import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaySaleCount = '';
  totalsaleCount = '';
  todaySaleData = '';
  loginData: any = [];
  errorMessage = false;
  errorMessage2 = false;

  constructor(private router: Router, private service: DashboardServiceService) { }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    var branchId = this.loginData._results.employee_branch_id;
    this.service.getSaleAndInventoryCount(branchId).subscribe(res => {
      if (res.json().status == true) {
        this.todaySaleCount = res.json().result.todaysale;
        this.totalsaleCount = res.json().result.totalsale
      } else {
        this.todaySaleCount = "0";
        this.totalsaleCount = '0';
      }
    });
  }

  todaySaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      sessionStorage.setItem('reports', 'y');
      this.router.navigate(['reports/today-sale']);
    } else {
      this.errorMessage = true;
      setTimeout(() => {
        this.errorMessage = false;
      }, 3000);
    }
  }

  totalSaleClick() {
    if (this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 1) {
      sessionStorage.setItem('reports', 'y');
      this.router.navigate(['reports/total-sale']);
    } else {
      this.errorMessage2 = true;
      setTimeout(() => {
        this.errorMessage2 = false;
      }, 3000);
    }
  }

  newSaleClick() {
    sessionStorage.removeItem('bookingData');
  }

}
