import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'fmyp-reports-dashboard',
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {

  todaySaleCount = '';
  totalsaleCount = '';
  loginData: any = [];


  constructor(private router: Router, private spinner :NgxSpinnerService, private service: DashboardServiceService ) { }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('reports'));
          console.log(this.loginData);
          if (this.loginData) {
            var branchId = this.loginData._results.employee_branch_id;
            console.log(branchId)
          }
          this.service.getSaleAndInventoryCount(branchId).subscribe(res => {
            this.todaySaleCount = res.json().result.todaysale;
            this.totalsaleCount = res.json().result.totalsale;
          });
  }

  todaySaleClick() {
    this.router.navigate(['reports/today-sale']);
  }
  totalSaleClick() {
    this.router.navigate(['reports/total-sale']);
  }
  vehicleDetailsClick() {
    this.router.navigate(['reports/vehicle-report']);
  }
  inventorydetailsClick() {
    this.router.navigate(['reports/inventory-report']);
  }

}
