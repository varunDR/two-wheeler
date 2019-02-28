import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fmyp-inv-sidebar',
  templateUrl: './inv-sidebar.component.html',
  styleUrls: ['./inv-sidebar.component.css']
})

export class InvSidebarComponent implements OnInit {

  vehicledetails = false;
  inventorylist = false;
  indentraise = false;
  listindent = false;
  inventoryass = false;
  acknowledgement = false;
  reversal = false;
  reversallist = false;
  rejectedlist = false;


  constructor(private router: Router) { }

  ngOnInit() {
    this.roleLogin();
  }

  roleLogin() {
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    if (loginData) {
      if (loginData.status == true && loginData._results.emp_type_id == 1) {
        this.vehicledetails = true;
        this.inventorylist = true;
        this.indentraise = true;
        this.listindent = true;
        this.inventoryass = true;
        this.acknowledgement = true;
        this.reversal = true;
        this.reversallist = true;
        this.rejectedlist = true
      } else if (loginData.status == true && loginData._results.emp_type_id == 2) {
        this.inventorylist = true;
        this.indentraise = true;
        this.acknowledgement = true;
        this.reversallist = true;
      } else if (loginData.status == true && loginData._results.emp_type_id == 3) {
        this.vehicledetails = true;
        this.listindent = true;
        this.inventoryass = true;
        this.reversal = true;
        this.rejectedlist = true
      }
      // else if (loginData.status == false ){
      //   this.errorMessage = true;
      // }
    }
  }

  redirectToVehicle() {
    this.router.navigate(['inventory/vehicle-details']);
  }

  redirectToInvList() {
    this.router.navigate(['inventory/inventory-list'])
  }

  redirectToIndent() {
    this.router.navigate(['inventory/indent-raising'])
  }

  redirectToInList() {
    this.router.navigate(['inventory/indent-list'])
  }

  redirectToInvAss() {
    sessionStorage.removeItem('indentData');
    this.router.navigate(['inventory/inventory-assigning'])
  }

  redirectToInvAck() {
    this.router.navigate(['inventory/inventory-acknowledge'])
  }

  redirectToInvReverse() {
    this.router.navigate(['inventory/inventory-reversal'])
  }

  redirectToInvReverseList() {
    this.router.navigate(['inventory/inventory-reversal-list'])
  }

  redirectToInvRejectedList(){
    this.router.navigate(['inventory/inventory-rejected-list'])
  }


  // RedirectToHome() {
  //   this.router.navigate(['sale-dashboard']);
  // }
}
