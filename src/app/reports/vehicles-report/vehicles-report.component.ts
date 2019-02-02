import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VehicleDetailService } from '../../services/vehicle-detail.service';
declare var jsPDF: any;
import { ExcelServiceService } from '../../services/excel-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fmyp-vehicles-report',
  templateUrl: './vehicles-report.component.html',
  styleUrls: ['./vehicles-report.component.css']
})
export class VehiclesReportComponent implements OnInit {
  bikes: any[];
  cols: any[];

  constructor(private router: Router, private service: VehicleDetailService, private excelService: ExcelServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'TVS-M Invoice No', header: 'Invoice No.' },
      { field: 'Sourced from', header: 'DC No.' },
      { field: 'Engine No', header: 'Engine No.' },
      { field: 'Frame No', header: 'Frame No.' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' }
    ];
    this.spinner.show()
    this.service.getVehicleDetails().subscribe(res => {
      if (res.json().status == true) {
        this.bikes = res.json().result
      } else {
        this.bikes = [];
      }
      this.spinner.hide()
    });
  }

  backToReports() {
    this.router.navigate(['reports']);
  }
  pdfDownload() {
    var columns = [
      { title: "EngineNo", dataKey: "vehicle_engineno" },
      { title: "Vehicle Name", dataKey: "vehicle_name" },
      { title: "Color", dataKey: "color_name" },
      { title: "Type", dataKey: "type_name" },
      { title: "MakeName", dataKey: "make_name" },
      { title: "Model Name", dataKey: "model_name" },
      { title: "Vehicle Cost", dataKey: "vehicle_cost" },
      { title: "KeyNo", dataKey: "vechile_key" },
      { title: "Vehicle DcNo", dataKey: "vechicle_dcno" },
      { title: "Vehicle FrameNo", dataKey: "vehicle_frameno" },
      { title: "Vehicle InvoiceNo", dataKey: "vechicle_invoiceno" },
    ];

    var rows = this.bikes;
    var doc = new jsPDF('');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        id: { fillColor: [255, 0, 0] }
      },
      margin: { top: 50 },
      addPageContent: function () {
        doc.text("VehicleDetails", 30, 30);
      }
    });
    doc.save('Vehicledetails.pdf');
  }

  xlDownload() {
    this.excelService.exportAsExcelFile(this.bikes, 'inventoryData');
  }

}
