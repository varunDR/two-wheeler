import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setup-price-list',
  templateUrl: './setup-price-list.component.html',
  styleUrls: ['./setup-price-list.component.css'],
  providers: [
    DatePipe
  ]
})
export class SetupPriceListComponent implements OnInit {

  addList: any[];
  cols: any[];

  constructor(private router: Router, private http: Http, private spinner: NgxSpinnerService, private dp: DatePipe) { }

  ngOnInit() {
    this.spinner.show();
    this.http.get(environment.host + 'setup-price-lists').subscribe(res => {
      if (res.json().status == true) {
        this.addList = res.json().result
      } else {
        this.addList = [];
      }
      this.spinner.hide();
    });

    this.cols = [
      { field: 'variant_name', header: 'Variant Name' },
      { field: 'pricing_list_date', header: 'List Date', type: this.dp },
      { field: 'EX.PRICE', header: 'Ex-price' },
      { field: 'LTAX & TR', header: 'LTAX & TR' },
      { field: 'INS - 1 Yr Comprehensive and 5 Yr Third Party', header: 'INS - 1 Yr Comprh and 5 Yr Third Party' },
      { field: 'FACILIATION CHARGES', header: 'FACILIATION CHARGES' },
      { field: 'TOTAL', header: 'TOTAL' },
      { field: 'STD ACC', header: 'STD ACC' },
      { field: 'OptionalACC', header: 'Optional ACC' },
      { field: 'Optional NIL DIP', header: 'Optional NIL DIP - 1+ 5Yr' },
      { field: 'Permantent Registation Cost', header: 'Registation Cost' },
      { field: ' HP Charges', header: 'HP Charges' },
      { field: 'TOTAL RS. With I Year + 5Y TP INS - Without NIL Dip', header: 'TOTAL RS. With I Year + 5Y TP INS - Without NIL Dip' },
      { field: 'TOTAL RS. With I Year + 5Y TP INS - With NIL Dip', header: 'TOTAL RS. With I Year + 5Y TP INS - With NIL Dip' },
      { field: 'Customer To Pay - Without PR/NIL DIP', header: 'Customer To Pay - Without PR/NIL DIP' },
      { field: 'Customer To Pay - with PR+NIL DIP', header: 'Customer To Pay - with PR+NIL DIP' },
      { field: 'price_type', header: 'Type' },
    ];
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }

  redirctToAddPriceList() {
    this.router.navigate(['setup/add-price-list'])
  }

}
