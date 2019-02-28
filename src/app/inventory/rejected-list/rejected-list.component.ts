import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'

@Component({
  selector: 'fmyp-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.css']
})
export class RejectedListComponent implements OnInit {
  cols: any[];
  inventoryData: any[];


  constructor(private router: Router, private spinner: NgxSpinnerService, private service: InventoryAssigningService, ) { }

  ngOnInit() {
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.spinner.show();
    this.service.getRejectedList(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      } else {
        this.inventoryData = [];
      }
      this.spinner.hide();
    });

    this.cols = [
      { field: 'engineno', header: 'Engine No' },
      { field: 'frameno', header: 'Frame No' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'reject_comment', header: 'Comment' }
    ];
  }
  backToInventory() {
    this.router.navigate(['inventory']);
  }
}
