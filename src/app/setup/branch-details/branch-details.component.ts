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
  editBranchData: any = [];
  deleteData: any = [];
  cols: any[];
  branchName: '';
  branchAddress: '';
  branchArea: '';
  branchLocation: '';
  contactNumber: '';
  temp: any;
  temp1: any
  branch_id: '';
  branch_name: '';
  branch_address: '';
  branch_area: '';
  branch_location: '';
  branch_contact_number: '';

  public options = { position: ["top", "right"] }
  constructor(private router: Router,private setupservice: SetupServiceService, private notif: NotificationsService, private spinner: NgxSpinnerService) { }

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
      branch_name: this.branchName,
      branch_address: this.branchAddress,
      branch_area: this.branchArea,
      branch_location: this.branchLocation,
      branch_contact_number: this.contactNumber,
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
      $('#addBranch').modal('hide');
    })
  }

  removeFields() {
    this.branchName = '',
      this.branchAddress = '',
      this.branchArea = '',
      this.branchLocation = '',
      this.contactNumber = ''
  }

  editBranch(data, index) {
    this.editBranchData = data;
    data.index = index;
    this.temp = index;
    this.branch_id = this.editBranchData[index].branch_id;
    this.branch_name = this.editBranchData[index].branch_name;
    this.branch_address = this.editBranchData[index].branch_address;
    this.branch_area = this.editBranchData[index].branch_area;
    this.branch_location = this.editBranchData[index].branch_location;
    this.branch_contact_number = this.editBranchData[index].branch_contact_number;
  }

  updateBranch() {
    var data = {
      branch_id: this.branch_id,
      branch_name: this.branch_name,
      branch_address: this.branch_address,
      branch_area: this.branch_area,
      branch_location: this.branch_location,
      branch_contact_number: this.branch_contact_number,
      rec_status: 1
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
      this.editBranchData[this.temp].branch_name = data.branch_name;
      this.editBranchData[this.temp].branch_address = data.branch_address;
      this.editBranchData[this.temp].branch_area = data.branch_area;
      this.editBranchData[this.temp].branch_location = data.branch_location;
      this.editBranchData[this.temp].branch_contact_number = data.branch_contact_number;
      this.editBranchData[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    this.removeFields();
    $('#editBranch').modal('hide')
  }

  deleteBranch(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.branch_id = this.deleteData[index].branch_id;
  }
  
  yesBranchDelete() {
    this.branchData.splice(this.temp1, 1)
    var data = {
      branch_id: this.branch_id,
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
