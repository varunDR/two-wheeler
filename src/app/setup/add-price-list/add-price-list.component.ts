import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as XLSX from 'xlsx';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-price-list',
  templateUrl: './add-price-list.component.html',
  styleUrls: ['./add-price-list.component.css']
})
export class AddPriceListComponent implements OnInit {
  variantList: any = [];
  arrayBuffer: any;
  file: File;
  list: any = [];
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  public options = { position: ["top", "right"] }

  constructor(private router: Router, private http: Http, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.http.get(environment.host + 'vehicle-variants').subscribe(res => {
      if (res.json().status == true) {
        this.variantList = res.json().result;
      } else {
        this.variantList = [];
      }
    });
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.list = XLSX.utils.sheet_to_json(worksheet, { raw: false })
      this.list.map(item => {
        item.pricing_list_date = item.pricing_list_date.replace("/", "-")
        item.pricing_list_date = item.pricing_list_date.replace("/", "-")
        this.variantList.map(variant => {
          if (item["MODEL"] == variant.variant_name) {
            item["vehicle_variant_id"] = variant.vehicle_variant_id;
            delete item["MODEL"];
          }
        });
      })
      console.log(this.list)
    }
    fileReader.readAsArrayBuffer(this.file);

  }

  backToPriceSetup() {
    this.router.navigate(['setup/price-list'])
  }
  submite() {
    this.spinner.show();
    this.http.post(environment.host + 'setup-price-lists/bulk', this.list).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Price-list Added Successfully',
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
  }

}
