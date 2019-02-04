import { Component, OnInit } from '@angular/core';
import { FooterServiceService } from '../../services/footer-service.service';
import { SelectItem } from 'primeng/api';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  searchList: any = [];
  titleStyle = "hidden";
  cols: any[];
  colorData: any = [];
  modelData: any = [];
  variantData: any = [];
  // search by model typeahead
  selectedValue: string;
  selectedOption: any = '';
  temp: any = [];
  noResult = false;
  selectedModelId: '';
  //search By Variant Typeahead
  selectedVariant: string;
  selectedOption1: any = '';
  temp1: any = [];
  selectedVariantId: '';
  //search By Color typeahead
  selectedColor: string;
  selectedOption2: any = '';
  temp2: any = [];
  selectedColorId: '';

  constructor(private service: FooterServiceService, private notif: NotificationsService, private allvehicleservice: AllVehicleService) { }
  ngOnInit() {
    this.cols = [
      { field: 'Engine No', header: 'Engine No' },
      { field: 'Frame No', header: 'Frame No' },
      { field: 'TVS-M Invoice No', header: 'Invoice No' },
      { field: 'variant_name', header: 'Variant ' },
      { field: 'model_name', header: 'Model ' },
      { field: 'color_name', header: 'Color' }
    ];
    this.allvehicleservice.getColor().subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
  }
  modelSearch(val) {
    if (val.length >= 2) {
      this.allvehicleservice.getModel().subscribe(data => {
        this.temp = [];
        this.temp.push(data.json().result);
        if (data.json().status == false) {
          this.modelData = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.modelData = this.temp.pop();

        }
      })
    } else {
      this.noResult = false;
      this.modelData = [];
    }
  }
  variantSearch(val) {
    if (val.length >= 2) {
      this.allvehicleservice.getVariant().subscribe(data => {
        this.temp1 = [];
        this.temp1.push(data.json().result);
        if (data.json().status == false) {
          this.variantData = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.variantData = this.temp1.pop();
          console.log(this.variantData)
        }
      })
    } else {
      this.noResult = false;
      this.variantData = [];
    }
  }
  colorSearch(val) {
    if (val.length >= 2) {
      this.allvehicleservice.getColor().subscribe(data => {
        this.temp2 = [];
        this.temp2.push(data.json().result);
        if (data.json().status == false) {
          this.colorData = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.colorData = this.temp2.pop();
          console.log(this.colorData)
        }
      })
    } else {
      this.noResult = false;
      this.colorData = [];
    }
  }

  onSelectModel(event: TypeaheadMatch): void {
    console.log('selected')
    this.selectedOption = event.item;
    this.selectedModelId = this.selectedOption.vehicle_model_id;
    console.log(this.selectedModelId)
  }
  onSelectVariant(event: TypeaheadMatch): void {
    this.selectedOption1 = event.item;
    this.selectedVariantId = this.selectedOption1.vehicle_variant_id;
    console.log(this.selectedVariantId);
  }
  onSelectColor(event: TypeaheadMatch): void {
    this.selectedOption2 = event.item;
    this.selectedColorId = this.selectedOption2.vehicle_color_id;
    console.log(this.selectedColorId);
  }


  searchVehicleDetails() {
    var url = '';

    if (this.selectedValue) {
      url = url + 'model=' + this.selectedModelId;
    }
    if (this.selectedVariant) {
      url = url + '&variant=' + this.selectedVariantId;
    }
    if (this.selectedColor) {
      url = url + '&color=' + this.selectedColorId;
    }
    console.log(url)
    this.service.globalSearch(url).subscribe(res => {
      console.log(res.json());
      console.log("*******")
      console.log(res)
      console.log(res.json().status)

      if (res.json().status == true) {
        this.titleStyle = "visible";
        this.searchList = res.json().result;
        console.log(this.searchList)
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
        this.titleStyle = "hidden";
        this.searchList = res.json()._body;
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
  detailsReset() {
    this.titleStyle = "hidden";
    this.selectedValue = '';
    this.selectedVariant = '';
    this.selectedColor = '';
  }
  // searchVehicleDetails() {
  //   console.log(this.selectedValue);
  //   console.log(this.selectedValue.length);
  //   if (this.selectedValue.length > 2) {
  //     this.titleStyle = "visible";
  //     this.service.globalSearch(this.selectedValue).subscribe(res => {
  //       console.log(res.json().result);
  //       if (res.json().status == true) {
  //         this.searchList = res.json().result;
  //         this.titleStyle = "visible";
  //       } else {
  //         this.searchList = [];
  //         this.titleStyle = "hidden";
  //       }
  //     })
  //   } else {
  //     this.searchList = [];
  //     this.titleStyle = "hidden";
  //   }
  // }
}
