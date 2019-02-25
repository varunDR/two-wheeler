import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupServiceService } from '../../services/setup-service.service';
declare var $: any;
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
  branchData: any = [];
  cols: any[];
  branch: any = {
    'branchId': '',
    'branchName': '',
    'branchAddress': '',
    'branchArea': '',
    'branchLocation': '',
    'contactNumber': '',
    'status':''
  }
  temp: any;
  temp1: any

  public options = { position: ["top", "right"] }
  constructor(private router: Router, private setupservice: SetupServiceService, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cols = [
      { field: 'branch_name', header: 'Name' },
      { field: 'branch_address', header: ' Address' },
      { field: 'branch_location', header: 'Location' },
      { field: 'branch_contact_number', header: 'Contact Number' }
    ];
    this.spinner.show();
    this.setupservice.getBranch().subscribe(res => {
      if (res.json().status == true) {
        this.branchData = res.json().result;
      } else {
        this.branchData = [];
      }
      this.spinner.hide();
    });
  }

  backToSetup() {
    this.router.navigate(['setup'])
  }
  addBranch() {
    var data = {
      branch_name: this.branch.branchName,
      branch_address: this.branch.branchAddress,
      branch_area: this.branch.branchArea,
      branch_location: this.branch.branchLocation,
      branch_contact_number: this.branch.contactNumber,
      rec_status: 1
    }
    console.log(data);
    this.setupservice.saveBranch(data).subscribe(res => {
      if (res.json().status == true) {
        this.branchData.push(res.json().result)
        this.branchData = this.branchData.slice();
        this.notif.success(
          'Success',
          'Branch Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      $('#addEditBranch').modal('hide');
    })
  }

  removeFields() {
      this.branch.branchName = '',
      this.branch.branchAddress = '',
      this.branch.branchArea = '',
      this.branch.branchLocation = '',
      this.branch.contactNumber = ''
  }

  editBranch(data, index) {
    data.index = index;
    this.temp = index;
    this.branch.branchId = data.branch_id;
    this.branch.branchName = data.branch_name;
    this.branch.branchAddress = data.branch_address;
    this.branch.branchArea = data.branch_area;
    this.branch.branchLocation = data.branch_location;
    this.branch.contactNumber = data.branch_contact_number;
    this.branch.status = data.rec_status;
  }

  updateBranch() {
    var data = {
      branch_id: this.branch.branchId,
      branch_name: this.branch.branchName,
      branch_address: this.branch.branchAddress,
      branch_area: this.branch.branchArea,
      branch_location: this.branch.branchLocation,
      branch_contact_number: this.branch.contactNumber,
      rec_status: this.branch.rec_status
    }
    this.setupservice.saveBranch(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Branch Updated Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.branchData[this.temp].branch_name = data.branch_name;
      this.branchData[this.temp].branch_address = data.branch_address;
      this.branchData[this.temp].branch_area = data.branch_area;
      this.branchData[this.temp].branch_location = data.branch_location;
      this.branchData[this.temp].branch_contact_number = data.branch_contact_number;
      this.branchData[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    this.removeFields();
    $('#addEditBranch').modal('hide')
  }

  deleteBranch(data, index) {
    this.temp1 = index;
    this.branch.branchId = data.branch_id;
  }

  yesBranchDelete() {
    this.branchData.splice(this.temp1, 1)
    var data = {
      branch_id: this.branch.branchId,
      rec_status: "0"
    }
    this.setupservice.saveBranch(data).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Branch Deleted Successfully',
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
}
