import { Component, OnInit } from '@angular/core';
import { SaleUserService } from '../../services/sale-user.service'
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Http } from '@angular/http'
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fmyp-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css'],
})
export class ViewSalesComponent implements OnInit {

  lists: any[];
  vehicles: any[];
  cols: any[];
  editPersonalInfo: any = [];
  invoiceInfo: any = [];
  dcFormInfo: any = [];
  branchData: any = [];
  temp: any;
  excTemp: any;
  public date1: any;
  selectedOption: any = '';
  taxData: any;
  lifeTax: number;
  VehicleInsu: number;
  temp1: any[] = new Array();
  onRoadPrice: number = 0;
  vehicleFrameNo = '';
  vehicleDcNo = '';
  vehicleKeyNo = ''
  vehicleColor = '';
  nomineeName = '';
  vehicleBasic: '';
  lifeTaxAmount: number;
  vehicleInsuAmount: number;
  taxAmount: number;
  basicwithTax: number;
  employeedata: any;
  branchManagerData: any = [];
  isShowOriginalImg: boolean = false;
  url: any;
  profile_name: any;
  loginData: any = [];
  accountLogin: boolean = false;

  user_type: '';
  sale_user_id: '';
  firstname: '';
  display_name_on_rc: '';
  email_id: '';
  mobile: '';
  relation: '';
  password; '';
  city: '';
  address: '';
  dob: any;
  mandal: '';
  district: '';
  proof_type: '';
  proof_num: '';
  user_image: '';
  sale_status: '';
  vech_sale_user_id: '';
  eng_no: '';
  frame_no: '';
  dc_no: '';
  key_no: '';
  vechicle_color: '';
  Nominee_name: '';
  basic_price: '';
  life_tax: '';
  insurance: '';
  handling: '';
  registration: '';
  warranty: '';
  accessories: '';
  hp: '';
  discount: any;
  total_amt: number;
  discount_approved_by: ''
  sale_user_vechile_exchange_id: '';
  exc_vechile_no: '';
  exc_eng_no: '';
  exc_frame_no: '';
  exc_vechile_color: '';
  exc_vechile_mode: '';
  exc_customer_name: '';
  exchange_amt: '';
  exchange_amt_approval_by: '';

  //sale_user_vechile_exchange_id:'';
  exc_sale_user_id: '';
  exchangevehicleNo: '';
  exchangeEngineNo: '';
  exchangeFrameNo: '';
  exchangeVehicleColor: '';
  exchangeVehicleModel: '';
  vehiclecustomerName: '';
  exchangeAmount: '';
  exchangeAmountApprovedBy: '';
  constructor(private service: SaleUserService, private spinner: NgxSpinnerService, private router: Router, private http: Http) { }

  ngOnInit() {
    this.spinner.show();
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.service.getListDetails().subscribe(res => {
      if (res.json().status == true) {
        this.lists = res.json().result;
      } else {
        this.lists = [];
      }
      this.spinner.hide();
    });

    this.http.get(environment.host + 'branches').subscribe(res => {
      if (res.json().status == true) {
        this.branchData = res.json().result;
      } else {
        this.branchData = [];
      }
    })

    this.service.getTax().subscribe(res => {
      this.taxData = res.json().result;
      this.lifeTax = this.taxData[0].life_tax;
      this.VehicleInsu = this.taxData[0].insurance;
    });

    this.http.get(environment.host + 'employees').subscribe(employeedata => {
      if (employeedata.json().status == true) {
        this.employeedata = employeedata.json().result;
      }
      for (var i = 0; i < this.employeedata.length; i++) {
        if (this.employeedata[i].emp_type_id == 2) {
          this.branchManagerData.push(this.employeedata[i])
        }
      }
    });

    this.cols = [
      { field: 'firstname', header: 'First Name' },
      // { field: 'email_id', header: 'Email' },
      { field: 'address', header: 'Address' },
      { field: 'mandal', header: 'Mandal' },
      { field: 'district', header: 'District' },
      { field: 'proof_type', header: 'Proof Type' },
      { field: 'eng_no', header: 'EngineNo' },
      { field: 'frame_no', header: 'FrameNo' },
      // { field: 'dc_no', header: 'DcNo' },
      { field: 'total_amt', header: 'Total Amount' }
    ];
  }

  editList(data, index) {
    this.editPersonalInfo = data;
    data.index = index;
    this.temp = index;
    let newDate = moment(this.editPersonalInfo[index].dob).format('DD-MM-YYYY').toString();
    this.dob = newDate;
    this.user_type = this.editPersonalInfo[index].user_type;
    this.sale_user_id = this.editPersonalInfo[index].sale_user_id;
    this.firstname = this.editPersonalInfo[index].firstname;
    this.display_name_on_rc = this.editPersonalInfo[index].display_name_on_rc;
    this.email_id = this.editPersonalInfo[index].email_id;
    this.mobile = this.editPersonalInfo[index].mobile;
    this.relation = this.editPersonalInfo[index].relation;
    this.password = this.editPersonalInfo[index].password;
    this.city = this.editPersonalInfo[index].city;
    this.address = this.editPersonalInfo[index].address;
    this.mandal = this.editPersonalInfo[index].mandal;
    this.district = this.editPersonalInfo[index].district;
    this.proof_type = this.editPersonalInfo[index].proof_type;
    console.log(this.proof_type)
    this.proof_num = this.editPersonalInfo[index].proof_num;
    this.user_image = this.editPersonalInfo[index].user_image;
    this.eng_no = this.editPersonalInfo[index].eng_no;
    this.frame_no = this.editPersonalInfo[index].frame_no;
    this.dc_no = this.editPersonalInfo[index].dc_no;
    this.key_no = this.editPersonalInfo[index].key_no;
    this.vechicle_color = this.editPersonalInfo[index].vechicle_color;
    this.Nominee_name = this.editPersonalInfo[index].Nominee_name;
    this.basic_price = this.editPersonalInfo[index].basic_price;
    this.life_tax = this.editPersonalInfo[index].life_tax;
    this.insurance = this.editPersonalInfo[index].insurance;
    this.handling = this.editPersonalInfo[index].handling;
    this.registration = this.editPersonalInfo[index].registration;
    this.warranty = this.editPersonalInfo[index].warranty;
    this.accessories = this.editPersonalInfo[index].accessories;
    this.hp = this.editPersonalInfo[index].hp;
    this.discount = this.editPersonalInfo[index].discount;
    this.total_amt = this.editPersonalInfo[index].total_amt;
    this.discount_approved_by = this.editPersonalInfo[index].discount_approved_by;
    console.log(this.discount_approved_by);
    this.sale_user_vechile_exchange_id = this.editPersonalInfo[index].sale_user_vechile_exchange_id
    this.exc_vechile_no = this.editPersonalInfo[index].exc_vechile_no;
    this.exc_eng_no = this.editPersonalInfo[index].exc_eng_no;
    this.exc_frame_no = this.editPersonalInfo[index].exc_frame_no;
    this.exc_vechile_color = this.editPersonalInfo[index].exc_vechile_color;
    this.exc_vechile_mode = this.editPersonalInfo[index].exc_vechile_mode;
    this.exc_customer_name = this.editPersonalInfo[index].exc_customer_name;
    this.exchange_amt = this.editPersonalInfo[index].exchange_amt;
    this.exchange_amt_approval_by = this.editPersonalInfo[index].exchange_amt_approval_by;
    if (this.loginData._results.emp_type_id == 1 || this.loginData._results.emp_type_id == 5) {
      this.accountLogin = true;
    }
  }

  update: any;
  getDob() {
    let newdate = new Date(this.dob)
    this.update = newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate();
  }

  redirectToInvoice(val, _index) {
    this.service.saveSalesUser({ sale_user_id: val, sale_account_check: 1 }).subscribe(res => {
      console.log(res.json())
      if (res.json().status == true) {
        this.editPersonalInfo[_index].sale_account_check = 1;
      }
    })
  }

  invoiceList(data, index) {
    this.invoiceInfo = data;
    sessionStorage.setItem('invoiceData', JSON.stringify(this.invoiceInfo));
  }

  dcFormList(data, index) {
    this.dcFormInfo = data;
    sessionStorage.setItem('dcFormData', JSON.stringify(this.dcFormInfo));
  }

  onFileChanged(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      var reader1 = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.profile_name = file.name;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader1.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    binaryString = binaryString.replace(/^data:image\/png;base64,/, "");
    binaryString = binaryString.replace(/^data:image\/jpg;base64,/, "");
    this.url = event.target;
    this.isShowOriginalImg = true;
    this.user_image = binaryString;
  }

  updatePersonInfo() {
    var data = {
      sale_user_id: this.sale_user_id,
      user_type: this.user_type,
      firstname: this.firstname,
      display_name_on_rc: this.display_name_on_rc,
      email_id: this.email_id,
      dob: this.update,
      mobile: this.mobile,
      relation: this.relation,
      password: this.password,
      city: this.city,
      address: this.address,
      mandal: this.mandal,
      district: this.district,
      proof_type: this.proof_type,
      proof_num: this.proof_num,
      user_image: this.user_image,
      sale_status: this.sale_status
    }
    this.service.saveSalesUser(data).subscribe(res => {
      this.lists[this.temp].firstname = data.firstname;
      this.lists[this.temp].display_name_on_rc = data.display_name_on_rc;
      this.lists[this.temp].email_id = data.email_id;
      this.lists[this.temp].mobile = data.mobile;
      this.lists[this.temp].dob = data.dob;
      this.lists[this.temp].relation = data.relation;
      this.lists[this.temp].password = data.password;
      this.lists[this.temp].city = data.city;
      this.lists[this.temp].address = data.address;
      this.lists[this.temp].mandal = data.mandal;
      this.lists[this.temp].district = data.district;
      this.lists[this.temp].proof_type = data.proof_type;
      this.lists[this.temp].proof_num = data.proof_num;
      this.lists[this.temp].sale_status = data.sale_status;
      this.temp = " ";
    })
  }

  updateVehicleInfo() {
    var data = {
      sale_user_id: this.sale_user_id,
      user_type: this.user_type,
      vech_sale_user_id: this.vech_sale_user_id,
      eng_no: this.eng_no,
      frame_no: this.frame_no,
      dc_no: this.dc_no,
      key_no: this.key_no,
      vechicle_color: this.vechicle_color,
      Nominee_name: this.Nominee_name,
      basic_price: this.basic_price,
      life_tax: this.life_tax,
      insurance: this.insurance,
      handling: this.handling,
      registration: this.registration,
      warranty: this.warranty,
      accessories: this.accessories,
      hp: this.hp,
      discount: this.discount,
      discount_approved_by: this.discount_approved_by,
      total_amt: this.total_amt
    }
    this.service.saveSalesVehicle(data).subscribe(res => {
    })
  }

  updateExchangeInfo(val, index) {
    var data = {
      exc_sale_user_id: this.sale_user_id,
      sale_user_vechile_exchange_id: this.sale_user_vechile_exchange_id,
      exc_vechile_no: this.exc_vechile_no,
      exc_eng_no: this.exc_eng_no,
      exc_frame_no: this.exc_frame_no,
      exc_vechile_color: this.exc_vechile_color,
      exc_vechile_mode: this.exc_vechile_mode,
      exc_customer_name: this.exc_customer_name,
      exchange_amt: this.exchange_amt,
      exchange_amt_approval_by: this.exchange_amt_approval_by,
      exc_sale_exchange_status: 1
    }
    this.service.saveExchangeVehicle(data).subscribe(res => {
      this.lists[this.temp].exc_vechile_no = data.exc_vechile_no;
      this.lists[this.temp].exc_eng_no = data.exc_eng_no;
      this.lists[this.temp].exc_frame_no = data.exc_frame_no;
      this.lists[this.temp].exc_vechile_color = data.exc_vechile_color;
      this.lists[this.temp].exc_vechile_mode = data.exc_vechile_mode;
      this.lists[this.temp].exc_customer_name = data.exc_customer_name;
      this.lists[this.temp].exchange_amt = data.exchange_amt;
      this.lists[this.temp].exchange_amt_approval_by = data.exchange_amt_approval_by;

    })
  }
}

