import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'fmyp-man-sidebar',
  templateUrl: './man-sidebar.component.html',
  styleUrls: ['./man-sidebar.component.css']
})
export class ManSidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  redirectToAddEmployee(){
    this.router.navigate(['manager/add-employee'])
  }

}
