import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllVehicleService } from '../services/all-vehicle.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NotificationsService } from 'angular2-notifications';
import { FooterServiceService } from '../services/footer-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  selectedVariant: string;
  selectedOption1: any = '';
  temp1: any = [];
  selectedVariantId: '';
  variantData: any = [];
  noResult = false;
  pricelistStyle = "hidden";
  priceList: any = [];
  cols: any[];
  constructor(private router: Router, private notif: NotificationsService, private allvehicleservice: AllVehicleService, private service: FooterServiceService) { }

  ngOnInit() {
    this.cols = [
      { field: 'EX.PRICE', header: 'EX Price' },
      { field: 'LTAX & TR', header: 'Life Tax' },
      { field: 'INS - 1 Yr Comprehensive and 5 Yr Third Party', header: 'Insurance' },
      { field: 'FACILIATION CHARGES', header: 'HandlingC' },
      { field: 'STD ACC', header: 'Standard Accessories' },
      { field: 'Permantent Registation Cost', header: 'Registation' },
      { field: ' HP Charges', header: ' HP Charges' },
      { field: 'price_type', header: 'Type' }
    ];
  }

  newSaleClick() {
    sessionStorage.removeItem('bookingData');
    sessionStorage.removeItem('salesdata')
    this.router.navigate(['sale/new-sale']);
  }

  bookingFormClick() {
    this.router.navigate(['sale/booking-form']);
  }

  logOutClick() {
    window.sessionStorage.clear()
    this.router.navigate(['login'])
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
        }
      })
    } else {
      this.noResult = false;
      this.variantData = [];
    }
  }

  onSelectVariant(event: TypeaheadMatch): void {
    this.selectedOption1 = event.item;
    this.selectedVariantId = this.selectedOption1.vehicle_variant_id;
  }

  searchVehicleDetails() {
    if (this.selectedVariant) {
      if (this.selectedVariant.length > 2) {
        this.service.priceSearch(this.selectedVariantId).subscribe(res => {
          console.log(res.json().result);
          if (res.json().status == true) {
            this.pricelistStyle = "visible"
            this.priceList = res.json().result;
          } else {
            this.priceList = [];
            this.pricelistStyle = "hidden"
          }
        })
      }
    }
  }

  detailsReset() {
    this.pricelistStyle = "hidden"
    this.selectedVariant = '';
  }

}
