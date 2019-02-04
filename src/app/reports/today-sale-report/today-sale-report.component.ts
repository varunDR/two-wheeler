import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DashboardServiceService } from '../../services/dashboard-service.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fmyp-today-sale-report',
  templateUrl: './today-sale-report.component.html',
  styleUrls: ['./today-sale-report.component.css']
})
export class TodaySaleReportComponent implements OnInit {
  loginData: any = [];
  cols: any[];
  branchId = '';
  todaySaleList: any = [];
  url = ''
  vehicleTypeFilter = '';

  constructor(private router: Router, private notif: NotificationsService, private spinner: NgxSpinnerService, private service: DashboardServiceService, private excelService: ExcelServiceService) { }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    console.log(this.loginData);
    if (this.loginData) {
      this.spinner.show();
      this.branchId = this.loginData._results.employee_branch_id;
      this.service.getTodayFilter(this.branchId, '').subscribe(res => {
        this.spinner.hide();
        if (res.json().status == true) {
          this.todaySaleList = res.json().result;
        }
      });
    }

    this.cols = [
      { field: 'firstname', header: 'First Name' },
      // { field: 'email_id', header: 'Email' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      { field: 'user_type', header: 'User Type' },
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }
    ];

  }

  backToReports() {
    let session = JSON.stringify(sessionStorage.getItem('reports'));
    if (session == '"y"') {
      this.router.navigate(['sale/dashboard']);
    } else {
      this.router.navigate(['reports/report']);
    }
  }

  pdfDownload() {
    var columns = [
      { title: "First Name", dataKey: "firstname" },
      { title: "Email", dataKey: "email_id" },
      { title: "Address", dataKey: "address" },
      { title: "EngineNo", dataKey: "eng_no" },
      { title: "FrameNo", dataKey: "frame_no" },
      { title: "DcNo", dataKey: "dc_no" },
      { title: "Total Amount", dataKey: "total_amt" }
    ];
    var rows = this.todaySaleList;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("Todaysale", 30, 30);
      }
    });
    doc.save('Todaysale.pdf');
  }
  xlDownload() {
    this.excelService.exportAsExcelFile(this.todaySaleList, 'TodaySalesList');
  }

  detailsReset() {
    this.service.getTodayFilter(this.branchId, this.url).subscribe(res => {
      console.log(res.json().result)
      this.todaySaleList = res.json().result
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Reset Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
    this.vehicleTypeFilter = "";
  }

  detailsGo() {

    if (this.vehicleTypeFilter) {
      this.url = this.url + '&user_type=' + this.vehicleTypeFilter;
    }
    this.service.getTodayFilter(this.branchId, this.url).subscribe(res => {
      console.log(res.json().status)
      if (res.json().status == true) {
        this.todaySaleList = res.json().result;
        console.log(this.todaySaleList)
        this.notif.success(
          'Success',
          'Filter Applied Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      else {
        this.todaySaleList = res.json()._body;
        this.notif.warn(
          'Sorry',
          'No Records Found',
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
