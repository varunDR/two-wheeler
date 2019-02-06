import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { VehicleDetailService } from '../../services/vehicle-detail.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-vehicle-bulk',
  templateUrl: './add-vehicle-bulk.component.html',
  styleUrls: ['./add-vehicle-bulk.component.css']
})
export class AddVehicleBulkComponent implements OnInit {

  constructor(private router: Router, private service: AllVehicleService, private vehicleservice: VehicleDetailService, private notif: NotificationsService, private spinner: NgxSpinnerService) { }
  arrayBuffer: any;
  file: File;
  colorData: any[];
  typeData: any[];
  modelData: any[];
  variantData: any[];
  errorData: any[];
  cols: any[];
  public options = { position: ["top", "right"] }
  enableErrorData = 'hidden';
  list: any = [];
  uploadStyle = 'hidden';


  ngOnInit() {
    this.service.getColor().subscribe(data => {
      this.colorData = data.json().result;
    });
    this.service.getCategory().subscribe(data => {
      this.typeData = data.json().result;
    });
    this.service.getModel().subscribe(data => {
      this.modelData = data.json().result;
    });
    this.service.getVariant().subscribe(data => {
      this.variantData = data.json().result;
    })

    this.cols = [
      { field: 'TVS-M Invoice No', header: 'Invoice No' },
      { field: 'Sourced from', header: 'Sorce From' },
      { field: 'Category', header: 'Category' },
      { field: 'Model', header: 'Model' },
      { field: 'Colour', header: 'Color' },
      { field: 'Variant', header: 'Variant' },
      { field: 'Engine No', header: 'Engine No' },
      { field: 'Frame No', header: 'Frame No' },
    ];
  }

  backToVehicleDetails() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.uploadStyle = 'visible'
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
        item["TVS-M Invoice Date"] = item["TVS-M Invoice Date"].replace("/", "-")
        item["TVS-M Invoice Date"] = item["TVS-M Invoice Date"].replace("/", "-")
        item["Engine No"] = item["Engine No"].toUpperCase();
        item["Frame No"] = item["Frame No"].toUpperCase();
        var engineMoreCount: any = []
        if (item["Engine No"].length > 12) {
          engineMoreCount = item["Engine No"]
          console.log(engineMoreCount)
        }
        this.colorData.map(color => {
          if (item["Colour"] == color.color_name) {
            item["vehicle_color"] = color.vehicle_color_id;
            // delete item["Colour"];
          }
        });
        this.typeData.map(type => {
          if (item["Category"] == null) {

          } else {
            if (item["Category"].toLowerCase() == type.type_name.toLowerCase()) {
              item["vehicle_type"] = type.vehicle_type_id;
              // delete item["Category"];
            }
          }
        });
        this.modelData.map(model => {
          if (item["Model"] == null) {
          } else {
            if (item["Model"].toLowerCase() == model.model_name.toLowerCase()) {
              item["vehicle_model"] = model.vehicle_model_id;
              // delete item["Model"];
            }
          }
        });
        this.variantData.map(variant => {
          if (item["Variant"] == null) {

          } else {
            if (item["Variant"].toLowerCase() == variant.variant_name.toLowerCase()) {
              item["vehicle_variant"] = variant.vehicle_variant_id;
              // delete item["Variant"]
            }
          }
          // item["vehicle_variant"] = 1;
          // delete item["variant"];
        })
      });
      console.log(this.list)
    }
    fileReader.readAsArrayBuffer(this.file);
    this.notif.success(
      'Success',
      'uploaded',
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 50
      }
    )
  }

  addBulkVehicles() {
    this.spinner.show();
    this.vehicleservice.addVehicleDetailBulk(this.list).subscribe(res => {
      this.spinner.hide();
      console.log(res.json());
      console.log(res.json().errdata);
      console.log(Object.keys(res.json().errdata).length)
      if (res.json().status == true) {
        if (Object.keys(res.json().errdata).length > 0) {
          this.enableErrorData = 'visible';
          this.errorData = res.json().errdata
          console.log(this.errorData)
          this.notif.alert(
            'Error',
            'Failed To Add below Fields',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
        } else {
          this.notif.success(
            'Success',
            'Added Bulk Successfully',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
          setTimeout(() => {
            this.router.navigate(['inventory/vehicle-details']);
          }, 1000);
        }
      }
      // else {
      //   this.notif.alert(
      //     'Error',
      //     'Failed To Add',
      //     {
      //       timeOut: 3000,
      //       showProgressBar: true,
      //       pauseOnHover: false,
      //       clickToClose: true,
      //       maxLength: 50
      //     }
      //   )
      // }
    })
  }

}
