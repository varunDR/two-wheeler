import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'fmyp-vehsetup-side',
  templateUrl: './vehsetup-side.component.html',
  styleUrls: ['./vehsetup-side.component.css']
})
export class VehsetupSideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backToSetup(){
    this.router.navigate(['setup']);
  }
  redirectToType() {
    this.router.navigate(['setup/vehicle-type']);
  }
  redirectToModel() {
    this.router.navigate(['setup/vehicle-model']);
  }
  redirectToVariant() {
    this.router.navigate(['setup/vehicle-variant']);
  }
  redirectToColor() {
    this.router.navigate(['setup/vehicle-color']);
  }
  redirectToMade() {
    this.router.navigate(['setup/vehicle-make']);
  }
}
