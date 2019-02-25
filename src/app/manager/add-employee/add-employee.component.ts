import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { ManagerServiceService } from '../../services/manager-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { EmpTypePipe } from '../../pipe/emp-type.pipe';
declare var $: any;

@Component({
  selector: 'fmyp-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  _empData: any;
  brData: any;
  cols: any[];
  employees: any[];
  employeeForm: FormGroup;
  submitted = false;
  editData: any = [];
  deleteData: any = [];
  temp: any;
  temp1: any;
  empData: any;
  employee_id: '';
  employee_firstname: '';
  employee_lastname: '';
  employee_branch_id: '';
  employee_address: '';
  employee_pincode: '';
  email_id: '';
  phone: '';
  password: '';
  emp_type_id: '';
  rec_status: '';

  firstName: '';
  lastName: '';
  branch: '';
  address: '';
  pincode: '';
  emailId: '';
  Phone: '';
  Password: '';
  employeeType: '';
  passwordLogin = "";
  mailId = "";
  loginData: any;

  constructor(private http: Http, private formBuilder: FormBuilder, private router: Router, private service: ManagerServiceService, private empTypePipe: EmpTypePipe, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loginData = JSON.parse(sessionStorage.getItem('manager'));
    console.log(this.loginData)
    var brurl = '';
    brurl = brurl + '?branchid=' + this.loginData._results.employee_branch_id;
    brurl = brurl + '&empid=' + this.loginData._results.employee_id
    this.service.getEmployeeDetails(brurl).subscribe(res => {
      if (res.json().status == true) {
        this.employees = res.json().result;
      } else {
        this.employees = [];
      }
      this.spinner.hide();
    })

    this.http.get(environment.host + 'emp-types').subscribe(data => {
      if (data.json().status == true) {
        this._empData = data.json().result;
      } else {
        this._empData = [];
      }
    });

    this.http.get(environment.host + 'branches').subscribe(data => {
      if (data.json().status == true) {
        this.brData = data.json().result;
      } else {
        this.brData = [];
      }
    });

    this.cols = [
      { field: 'employee_firstname', header: 'First Name' },
      { field: 'employee_lastname', header: 'Last Name' },
      { field: 'branch_name', header: 'Branch' },
      { field: 'employee_address', header: 'Address' },
      { field: 'email_id', header: 'Email' },
      { field: 'phone', header: 'Phone' },
    ];

    this.employeeForm = this.formBuilder.group({
      employeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeBranch: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      employeePinCode: ['', Validators.required],
      empType: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  get f() { return this.employeeForm.controls; }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  toGetData() {
    console.log(this.loginData._results.emp_type_id)
    if (this.loginData.status == true && this.loginData._results.emp_type_id == 1 || this.loginData._results.emp_type_id == 2 || this.loginData._results.emp_type_id == 3) {
      if (this.loginData._results.emp_type_id == 3) {
        this.empData = this.empTypePipe.transform(this._empData, this.loginData._results);
      }
      if (this.loginData._results.emp_type_id == 2) {
        this.empData = this.empTypePipe.transform(this._empData, this.loginData._results);
      }
      if (this.loginData._results.emp_type_id == 1) {
        this.empData = this.empTypePipe.transform(this._empData, this.loginData._results);
      }
    }

  }

  addEmployee() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    var data = {
      employee_firstname: this.firstName,
      employee_lastname: this.lastName,
      employee_branch_id: this.branch,
      employee_address: this.address,
      employee_pincode: this.pincode,
      email_id: this.emailId,
      emp_type_id: this.employeeType,
      phone: this.Phone,
      password: this.Password,
      rec_status: 1
    }
    this.service.saveEmployeeDetails(data).subscribe(res => {
      console.log(res.json());
      this.employees.push(res.json().result);
      this.employees = this.employees.slice();
      console.log(this.employees);
      $('#addEmployee').modal('hide');
    });
  }

  removeFields() {
    this.submitted = false;
    this.firstName = '',
      this.lastName = '',
      this.emailId = '',
      this.Password = '',
      this.employeeType = '',
      this.branch = '',
      this.Phone = '',
      this.address = '',
      this.pincode = ''
  }

  backToManager() {
    this.router.navigate(['manager/side-bar']);
  }

  editEmployee(data, index) {
    this.editData = data;
    data.index = index;
    this.temp = index;
    this.employee_id = this.editData[index].employee_id,
      this.employee_firstname = this.editData[index].employee_firstname,
      this.employee_lastname = this.editData[index].employee_lastname,
      this.employee_branch_id = this.editData[index].employee_branch_id,
      this.employee_address = this.editData[index].employee_address,
      this.employee_pincode = this.editData[index].employee_pincode,
      this.email_id = this.editData[index].email_id,
      this.phone = this.editData[index].phone,
      this.emp_type_id = this.editData[index].emp_type_id,
      this.password = this.editData[index].password,
      this.rec_status = this.editData[index].rec_status
  }

  updateEmployee() {
    var data = {
      employee_id: this.employee_id,
      employee_firstname: this.employee_firstname,
      employee_lastname: this.employee_lastname,
      employee_branch_id: this.employee_branch_id,
      employee_address: this.employee_address,
      employee_pincode: this.employee_pincode,
      email_id: this.email_id,
      phone: this.phone,
      emp_type_id: this.emp_type_id,
      rec_status: this.rec_status
    }
    this.service.saveEmployeeDetails(data).subscribe(res => {
      this.employees[this.temp].employee_firstname = data.employee_firstname;
      this.employees[this.temp].employee_lastname = data.employee_lastname;
      this.employees[this.temp].employee_branch_id = data.employee_branch_id;
      this.employees[this.temp].employee_address = data.employee_address;
      this.employees[this.temp].employee_pincode = data.employee_pincode;
      this.employees[this.temp].email_id = data.email_id;
      this.employees[this.temp].phone = data.phone;
      this.employees[this.temp].emp_type_id = data.emp_type_id
      this.employees[this.temp].rec_status = data.rec_status;
      this.temp = " ";
    });
    $('#editEmployee').modal('hide')
  }

  deleteEmployee(val, index) {
    this.temp1 = index;
    this.deleteData = val;
    val.index = index;
    this.employee_id = this.deleteData[index].employee_id;
  }

  yesEmployeeDelete() {
    this.employees.splice(this.temp1, 1)
    var data = {
      employee_id: this.employee_id,
      rec_status: "0"
    }
    this.service.saveEmployeeDetails(data).subscribe(res => {
    })
  }

  //this method  allow alphabets 
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 0 || k == 32);
  }

  //This Method  allow Numbers
  only_allow_number(event) {
    var n;
    n = event.charCode
    return (n == 8 || n == 0 || n == 32 || (n >= 48 && n <= 57))
  }

  //this method allow both numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }

}
