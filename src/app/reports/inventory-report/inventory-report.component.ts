import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryAssigningService } from '../../services/inventory-assigning.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fmyp-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {
  cols: any[];
  inventoryData: any[];

  constructor(private router: Router, private service: InventoryAssigningService, private excelService: ExcelServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('reports'));
    var brurl = '';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.spinner.show();
    this.service.getInventoryList(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      } else {
        this.inventoryData = [];
      }
      this.spinner.hide();
    });
    this.cols = [
      { field: 'branch_name', header: 'Branch' },
      { field: 'indent_req_id', header: 'Indent ID' },
      { field: 'generated_shipping_id', header: 'Shipping ID' },
      { field: 'shipped_by', header: 'Shipped By' },
      { field: 'shipped_vechile_no', header: 'Vehicle No.' },
      { field: 'br_mgr_ack', header: 'Manager ACk' },
      { field: 'br_mgr_comment', header: 'Manager Comment' },
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' }
    ];
  }

  backToReports() {
    this.router.navigate(['reports']);
  }

  pdfDownload() {
    var columns = [
      { title: "Branch", dataKey: "branch_name" },
      { title: "Indent ID", dataKey: "indent_req_id" },
      { title: "Assaigned By", dataKey: "employee_firstname" },
      { title: "Shipping ID ", dataKey: "generated_shipping_id" },
      { title: "Shipped By ", dataKey: "shipped_by" },
      { title: " Generated Shipping Id ", dataKey: "generated_shipping_id" },
      { title: "Vehicle No ", dataKey: "vechile_no" },
      { title: " ChassisNo ", dataKey: "chassisno" },
      { title: " EngineNo ", dataKey: "engineno" },
    ]

    var rows = this.inventoryData;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("InventoryDetails", 30, 30);
      }
    });
    doc.save('Inventorydetails.pdf');
  }

  xlDownload() {
    this.excelService.exportAsExcelFile(this.inventoryData, 'inventoryData');
  }

}
