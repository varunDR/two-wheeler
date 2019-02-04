import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SaleUserService } from '../../services/sale-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleDetailService } from '../../services/vehicle-detail.service';
import { InventoryAssigningService } from '../../services/inventory-assigning.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'fmyp-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {

  newUser = true;
  exchangeUser = false;
  csdUser = false;
  forCsd = 0;
  branchManagerData: any = [];
  financierData: any = [];
  walletData: any = [];
  personalData: any;
  loginData: any = [];
  branchName: '';
  branchId: '';
  userId: '';

  selectedOption: any = '';
  selectedRadio = '';
  inventoryData: any;
  cols: any[];
  _selectVec: any;
  tempAcce: any;
  optionalNilDip: any;
  hpSelect: any = 0;
  noResult = false;
  isDisabled = 'hidden';
  disableCash = 'hidden';
  disableCredit = 'hidden';
  disableTransfer = 'hidden';
  disableOther = 'hidden';
  disableApprovedBy = 'hidden';
  public date1: any;
  public date2: any;
  public date3: any;
  uploadedFiles: any[] = [];
  personalinfoForm: FormGroup;
  cheque: any = '';
  cash: any = '';
  creditCard: any = '';
  accountTranfer: any = '';
  other: any = ''
  slika: any = ''
  //personal information
  name = '';
  nameOnRc = ''
  dob: any;
  relationName = '';
  address = '';
  mandal = '';
  pincode = '';
  districtName = '';
  mobile = '';
  email = '';
  addressProof = '';
  addressProofNo = '';
  userImage = '';
  userImageName = '';
  payOrder = '';
  payOrderName = '';
  deliveryFromShowroom = '';
  deliveryFileName = '';
  bankStatementname = '';
  //vehicle information
  vehicleEngineNo = '';
  vehicleFrameNo = '';
  vehicleDcNo = '';
  vehicleKeyNo = ''
  vehicleColor = '';
  vehicleModel = '';
  vehicleVariant = '';
  nomineeName = '';
  nomineeDob = '';
  secondVehicle = '';
  vehicleBasic: number;
  lifeTax: number;
  VehicleInsu: number;
  HandlingC: number;
  Registration: number;
  StandardAcc: number;
  VehicleHp: any = null;
  nilDip: number
  discountApprovedBy: any = {
    'discountsendotp_id': null,
    'name': '',
    'number': ''
  }
  exchangeApprovedBy: any = {
    'discountsendotp_id': null
  }
  handlingC: number;
  vehicleReg: '';
  vehicleWarranty: '';
  vehicleAcc: any;
  Hp: '';
  discount = 0;
  totalAmount: '';
  vehicleInsuAmount: number;
  taxAmount: number;
  basicwithTax: number;
  //typeahead
  selectedValue: string;
  temp: any[] = new Array();
  vehicleInfo: any[] = new Array();
  pdfName: any;
  //image uploads
  currentImage: any = '';
  bankuploadedFiles: any;
  myFiles: string[] = [];
  bankstmtImage: number = 0;
  data = []
  //paymentmode EMI
  paymentEmi: any = {
    'paymentMode': '',
    'financialName': '',
    'downPayment': 0,
    'addressProof': '',
    'addressFileName': '',
    'idProof': '',
    'idProofName': '',
    'bankStatement': [],
    'cheque': '',
    'chequeFileName': '',
    'chequeSelect': '',
    'chequeNo': '',
    'chequeAmount': '',
    'chequeDate': null,
    'bankName': '',
    'cashSelect': '',
    'cashAmount': 0,
    'creditcardSelect': '',
    'creditTransId': '',
    'creditcardAmount': 0,
    'accountTranferSelect': '',
    'accounttranferAmount': 0,
    'accountTranferId': '',
    'othersSelect': '',
    'mobileWallet': null,
    'othersAmount': 0,
  }
  submitted = false;
  banks: any = [
    {
      name: '',
      bankStatement: ''
    }
  ];
  cashTotal = 0;
  selectedAmountOption: any;
  //exchangevehicle details
  exchangevehicleNo: '';
  exchangeEngineNo: '';
  exchangeFrameNo: '';
  exchangeVehicleColor: '';
  exchangeVehicleModel: '';
  vehiclecustomerName: '';
  exchangeAmount: any;
  taxData: any;
  employeedata: any;
  amount: number;
  onRoadPrice: number;
  roadTax: number = 0;
  tempAmount: number = 0;
  taxCount: number = 0
  nilDipValue: any;
  bankStatemet: any;
  empTypeId: '';
  prYesChecked = '';
  accessriesYes = '';
  optionalAccessriesYes = '';
  fieldsData: any = [];
  exchange: '';
  total: any = '';
  //afterSelectedEngine remove that engine number to after select
  selectedVehicleNo: '';
  SelectedAssignNo: '';
  // files upload and preview
  addressPreview: any;
  idpreview: any;
  chequepreview: any;
  userimagePreview: any;
  payOrderPerview: any;
  deliveryFormPreview: any;
  finalSubmit: boolean = true;

  //to check status of api's
  userStatus: any;
  vehicleStatus: any;
  paymentStatus: any;
  exchangeStatus: any;
  csdStatus: any;

  //from booking Form
  _bookingData: any;
  bookingApprovedAmount = '';
  bookingApprovedby = '';
  bookingVehicleVariant = '';
  bookingVehicleModel = '';
  bookingVehicleColor = '';
  bookingAdvanceAmount: number;

  constructor(private saleUserService: SaleUserService, private vehicledetails: VehicleDetailService, private notif: NotificationsService, private spinner: NgxSpinnerService, private invetoryAssign: InventoryAssigningService, private formBuilder: FormBuilder, private http: Http, private router: Router) {
    this.cols = [
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' }
    ];
  }

  ngOnInit() {
    this.loginData = JSON.parse(sessionStorage.getItem('userSession'));
    this.branchName = this.loginData._results.branch_name
    this.branchId = this.loginData._results.employee_branch_id
    console.log(sessionStorage.salesdata)
    if (sessionStorage.salesdata) {
      this.fieldsData = JSON.parse(sessionStorage.getItem('salesdata'))
      this.name = this.fieldsData.name;
      this.nameOnRc = this.fieldsData.nameOnRc;
      let newDate1 = moment(this.fieldsData.nameOnRc).format('DD-MM-YYYY').toString();
      this.dob = newDate1;
      this.relationName = this.fieldsData.relationName;
      this.address = this.fieldsData.address;
      this.pincode = this.fieldsData.pincode;
      this.mandal = this.fieldsData.mandal;
      this.districtName = this.fieldsData.districtName;
      this.email = this.fieldsData.email;
      this.mobile = this.fieldsData.mobile;
      this.addressProof = this.fieldsData.addressProof;
      this.addressProofNo = this.fieldsData.addressProofNo
    }
    if (sessionStorage.bookingData) {
      console.log(sessionStorage.bookingData)
      this.name = " ";
      this.dob = " ";
      this.address = " ";
      this.mobile = " ";
      this.email = " ";
      this._bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
      console.log(this._bookingData)
      setTimeout(() => {
        this.name = this._bookingData.booking_form_name;
        this.dob = this._bookingData.booking_form_dob;
        this.address = this._bookingData.booking_form_address;
        this.mobile = this._bookingData.booking_form_mobile;
        this.email = this._bookingData.booking_form_email;
        this.bookingApprovedAmount = this._bookingData.approved_amount;
        this.bookingApprovedby = this._bookingData.employee_firstname;
        this.bookingVehicleColor = this._bookingData.color_name;
        this.bookingVehicleModel = this._bookingData.model_name;
        this.bookingVehicleVariant = this._bookingData.variant_name;
        this.bookingAdvanceAmount = this._bookingData.advance_payment;
        // this.status = '1';
      }, 1);
    }
    // else {
    //   this.name = " ";
    //   this.dob = " ";
    //   this.address = " ";
    //   this.mobile = " ";
    //   this.email = null;

    // }

    this.http.get(environment.host + 'discount-otp-no').subscribe(res => {
      if (res.json().status == true) {
        this.branchManagerData = res.json().result;
        console.log(this.branchManagerData)
      }
    })

    this.http.get(environment.host + 'finance-name').subscribe(res => {
      if (res.json().status == true) {
        this.financierData = res.json().result;
        console.log(this.financierData)
      }
    })

    this.http.get(environment.host + 'payment-types').subscribe(res => {
      if (res.json().status == true) {
        this.walletData = res.json().result;
        console.log(this.walletData)
      }
    })

    this.personalinfoForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      nameRc: ['', Validators.required],
      relation: ['', Validators.required],
      custAddress: ['', Validators.required],
      custMandal: ['', Validators.required],
      custPinecode: ['', Validators.required],
      custDistrict: ['', Validators.required],
      custMobile: ['', Validators.required],
      custEmail: ['', [Validators.required, Validators.email]],
      addressProof: ['', Validators.required],
      addressProofNo: ['', Validators.required]
    });

  }

  newUserClick(val) {
    this.forCsd = val
    console.log(this.forCsd)
    this.newUser = true;
    this.exchangeUser = false;
    this.csdUser = false;
  }

  exchangeUserClick(val) {
    this.forCsd = val
    console.log(this.forCsd)
    this.newUser = false;
    this.exchangeUser = true;
    this.csdUser = false;
  }

  csdUserClick(val) {
    this.forCsd = val
    console.log(this.forCsd)
    this.newUser = false;
    this.exchangeUser = false;
    this.csdUser = true;
  }

  triggerSomeEvent() {
    if (this.paymentEmi.chequeSelect == false) {
      this.isDisabled = 'hidden';
      this.paymentEmi.chequeAmount = null;
      this.paymentEmi.chequeNo = null;
    } else {
      this.isDisabled = 'visible';
    }
  }

  cashChangeEvent() {
    if (this.paymentEmi.cashSelect == false) {
      this.disableCash = 'hidden';
      this.paymentEmi.cashAmount = null;
    } else {
      this.disableCash = 'visible';
    }
  }

  creditCardEvent() {
    if (this.paymentEmi.creditcardSelect == false) {
      this.disableCredit = 'hidden';
      this.paymentEmi.creditcardAmount = null;
      this.paymentEmi.creditTransId = null
    } else {
      this.disableCredit = 'visible';
    }
  }

  tranferEvent() {
    if (this.paymentEmi.accountTranferSelect == false) {
      this.disableTransfer = 'hidden';
      this.paymentEmi.accounttranferAmount = null
      this.paymentEmi.accountTranferId = null
    } else {
      this.disableTransfer = 'visible';
    }
  }

  otherEvent() {
    if (this.paymentEmi.othersSelect == false) {
      this.disableOther = 'hidden';
      this.paymentEmi.othersAmount = null;
      this.paymentEmi.othersSelect = '';
    } else {
      this.disableOther = 'visible';
    }
  }

  addBankStatement(data, index) {
    if (index !== 5) {
      this.banks.push({
        name: this.pdfName,
        bankStatement: this.bankStatemet
      })
    }
  }

  deleteBankStatement(index) {
    this.banks.splice(index - 1, 1)
  }

  getreqDate() {
    let newDate = moment(this.dob).format('YYYY-MM-DD').toString();
    this.dob = newDate;
  }

  getNomineeDate() {
    let newDate = moment(this.nomineeDob).format('YYYY-MM-DD').toString();
    this.nomineeDob = newDate;
  }

  getChequedate() {
    let newDate = moment(this.paymentEmi.chequeDate).format('YYYY-MM-DD').toString();
    this.paymentEmi.chequeDate = newDate;
  }

  prChecked() {
    console.log(this.prYesChecked);
  }
  // accessriesChecked() {
  //   console.log(this.accessriesYes)
  //   // this.tempOnRoadPrice = this.onRoadPrice;
  //   if (this.accessriesYes == '0' && this.optionalAccessriesYes == '0') {
  //     this.vehicleAcc = 0;
  //   } else if (this.accessriesYes == '1' && this.optionalAccessriesYes == '1') {
  //     this.vehicleAcc = parseInt(this.tempAcce.standacc) + parseInt(this.tempAcce.optionalAtandacc);
  //   } else if (this.accessriesYes == '1') {
  //     this.vehicleAcc = this.tempAcce.standacc;
  //   } else if (this.optionalAccessriesYes == '1' && this.accessriesYes == '0') {
  //     this.vehicleAcc = this.tempAcce.optionalAtandacc
  //   }
  // }

  optionalAccessriesChecked() {
    console.log(this.optionalAccessriesYes)

    if (this.optionalAccessriesYes == '1') {
      this.vehicleAcc = this.tempAcce.optionalAtandacc;
    }
    if (this.optionalAccessriesYes == '0') {
      this.vehicleAcc = '';
    }
  }

  optionalNilDipChecked() {
    console.log(this.optionalNilDip)
    if (this.optionalNilDip == '1') {
      this.nilDipValue = this.nilDip;
    }
    if (this.optionalNilDip == '0') {
      this.nilDipValue = '';
    }
  }

  hpChargeshecked() {
    console.log(this.hpSelect)
    if (this.forCsd == 0) {
      if (this.hpSelect == '1') {
        this.VehicleHp = this.tempAcce.hp;
        console.log(this.VehicleHp)
      }
      if (this.hpSelect == '0') {
        this.VehicleHp = ''
      }
    }
  }
  //complete sale details
  get f() { return this.personalinfoForm.controls; }


  saveUserDeatils(val) {
    this.submitted = true;
    if (this.personalinfoForm.invalid) {
      return;
    }
    this.spinner.show();
    var data = {
      firstname: this.name,
      email_id: this.email,
      display_name_on_rc: this.nameOnRc,
      dob: this.dob,
      relation: this.relationName,
      address: this.address,
      mobile: this.mobile,
      mandal: this.mandal,
      pincode: this.pincode,
      district: this.districtName,
      proof_type: this.addressProof,
      proof_num: this.addressProofNo,
      user_image: this.userImage,
      user_image_name: this.userImageName,
      user_type: val,
      branchid: this.branchId,
      sale_status: "1"
    }
    this.saleUserService.saveSalesUser(data).subscribe(response => {
      this.userId = response.json().result.sale_user_id
      if (response.json().status == true) {
        this.userStatus = response.json().status;
      }
      // vehicle information send to sale-user api
      if (response.json().status == true) {
        // if (this.discountApprovedBy == undefined) {
        //   console.log('****************')
        //   this.discountApprovedBy.discountsendotp_id = null
        // }
        var vehicledetails = {
          vech_sale_user_id: response.json().result.sale_user_id,
          eng_no: this.vehicleEngineNo,
          frame_no: this.vehicleFrameNo,
          dc_no: this.vehicleDcNo,
          vechile_gatepass: this.vehicleKeyNo,
          vechicle_color: this.vehicleColor,
          Nominee_name: this.nomineeName,
          nomine_dob: this.nomineeDob,
          second_vechile: this.secondVehicle,
          pr: this.prYesChecked,
          accessries_radio: this.accessriesYes,
          basic_price: this.vehicleBasic,
          life_tax: this.lifeTax,
          insurance: this.VehicleInsu,
          handling: this.handlingC,
          registration: this.Registration,
          standaccessories: this.StandardAcc,
          accessories: this.vehicleAcc,
          hp: this.VehicleHp,
          discount: this.discount,
          total_amt: this.onRoadPrice,
          discount_approved_by: this.discountApprovedBy.discountsendotp_id,
          sale_user_vechile_status: 1
        }

        console.log(vehicledetails);
        this.saleUserService.saveSalesVehicle(vehicledetails).subscribe(vehicle => {
          console.log(vehicle.json().result);
          if (vehicle.json().status == true) {
            this.vehicleStatus = vehicle.json().status
          }

          console.log(this.vehicleStatus);
        });
      }
      //csd files send to api
      if (response.json().result.user_type == 2) {
        var csdDetails = {
          vech_sale_user_id: response.json().result.sale_user_id,
          user_type: response.json().result.user_type,
          csd_pay_order: this.payOrder,
          csd_pay_order_name: this.payOrderName,
          csd_delivery_showroom: this.deliveryFromShowroom,
          csd_delivery_showroom_name: this.deliveryFileName,
        }
        this.saleUserService.addPaymentEmi(csdDetails).subscribe(response => {
          console.log(response.json());
          if (response.json().status == true) {
            this.csdStatus = response.json().status;
          }
        })
      }
      //exchange vehicle information send to api
      if (val == '1') {
        var exchangeDetails = {
          exc_sale_user_id: response.json().result.sale_user_id,
          exc_vechile_no: this.exchangevehicleNo,
          exc_eng_no: this.exchangeEngineNo,
          exc_frame_no: this.exchangeFrameNo,
          exc_vechile_color: this.exchangeVehicleColor,
          exc_vechile_mode: this.exchangeVehicleModel,
          exc_customer_name: this.vehiclecustomerName,
          exchange_amt: this.exchangeAmount,
          exchange_amt_approval_by: this.exchangeApprovedBy.discountsendotp_id,
          exc_sale_exchange_status: 1
        }
        this.saleUserService.saveExchangeVehicle(exchangeDetails).subscribe(res => {
          console.log(res.json());
          if (res.json().status == true) {
            this.exchangeStatus = res.json().status;
          }
        })
      }
      //Payment Details send to api
      if (val == 0 || val == 1) {
        let chequeSelect;
        let cashSelect;
        let creditcardSelect;
        let accountSelect;
        let otherSelect;
        if (this.paymentEmi.chequeSelect == true) {
          chequeSelect = '1'
        } else {
          chequeSelect = '0'
        }

        if (this.paymentEmi.cashSelect == true) {
          cashSelect = '1'
        } else {
          cashSelect = '0'
        }
        if (this.paymentEmi.creditcardSelect == true) {
          creditcardSelect = '1'
        } else {
          creditcardSelect = '0'
        }
        if (this.paymentEmi.accountTransferSelect == true) {
          accountSelect = '1'
        } else {
          accountSelect = '0'
        }

        if (this.paymentEmi.othersSelect == true) {
          otherSelect = '1'
        } else {
          otherSelect = '0'
        }

        if (!this.paymentEmi.creditAmount) {
          this.paymentEmi.creditAmount = 0;
        }
        var paymentDetails = {
          pay_sale_user_id: response.json().result.sale_user_id,
          mode_of_payment: this.paymentEmi.paymentmode,
          emi_financial_name: this.paymentEmi.financialName,
          emi_financial_down_payment: this.paymentEmi.downPayment,
          emi_addresss_proof: this.paymentEmi.addressProof,
          address_name: this.paymentEmi.addressFileName,
          emi_id_proof: this.paymentEmi.idProof,
          id_name: this.paymentEmi.idProofName,
          emi_cheque: this.paymentEmi.cheque,
          cheque_name: this.paymentEmi.chequeFileName,
          cheque: chequeSelect,
          cheque_no: this.paymentEmi.chequeNo,
          cheque_date: this.paymentEmi.chequeDate,
          cheque_amt: this.paymentEmi.chequeAmount,
          cheque_bank: this.paymentEmi.bankName,
          cash: cashSelect,
          cash_amount: this.paymentEmi.cashAmount,
          credit_card: creditcardSelect,
          credit_card_tranactionid: this.paymentEmi.creditTransId,
          credit_card_amt: this.paymentEmi.creditcardAmount,
          account_transfer: accountSelect,
          account_trasaction_id: this.paymentEmi.accountTranferId,
          account_transfer_amt: this.paymentEmi.accounttranferAmount,
          other: otherSelect,
          others_type: this.paymentEmi.mobileWallet,
          others_amt: this.paymentEmi.othersAmount,
          total: this.cashTotal,
          emi_bank_stmt: '',
          bank_statement: this.banks
        }
        // if (this.paymentEmi.mobileWallet) {
        //   delete paymentDetails.others_type;
        // }
        this.saleUserService.addPaymentEmi(paymentDetails).subscribe(response => {
          this.spinner.hide();
          if (response.json().status == true) {
            this.paymentStatus = response.json().status
          }

        })
      }
    });

    var vehicleremoveData = {
      vehicle_id: this.selectedVehicleNo,
      status: "3"
    }
    this.vehicledetails.addVehicleDetails(vehicleremoveData).subscribe(res => {
      console.log(res.json());
    });
    var AssignData = {
      inventory_assign_id: this.SelectedAssignNo,
      status: "3"
    }
    this.invetoryAssign.addInventoryAssign(AssignData).subscribe(response => {
      console.log(response.json())
    });

    if (val == '0') {
      console.log('toast')
      if (this.userStatus && this.vehicleStatus && this.paymentStatus) {
        console.log('toast came')
        this.notif.success(
          'Success',
          'Sales Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    }
    if (val == '1') {
      if (this.userStatus && this.vehicleStatus && this.exchangeStatus && this.paymentStatus) {
        this.notif.success(
          'Success',
          'Sales Added Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    }
    window.sessionStorage.removeItem('salesdata');
    if (this._bookingData) {
      var bookingData = {
        booking_form_id: this._bookingData.booking_form_id,
        status: 0,
      }
      this.saleUserService.saveBookingForm(bookingData).subscribe(res => { })
    }
  }

  engineSearch(val) {
    if (val.length > 2) {
      this.saleUserService.searchEngine(this.branchId, val).subscribe(data => {
        this.temp = [];
        this.temp.push(data.json().result);
        console.log("check here ")
        console.log(data.json())
        if (data.json().status == false) {
          this.vehicleInfo = [];
          this.noResult = true;
        } else {
          this.noResult = false;
          this.vehicleInfo = this.temp.pop();
          console.log(this.vehicleInfo);
        }
      })
    } else {
      this.noResult = false;
      this.vehicleInfo = [];
    }
  }

  secondVehicleClick() {
    this.total = 0;
    if (this.secondVehicle.toString() == 'true') {
      this.total = this.total + this.vehicleBasic * (5 / 100)
      if (this.total) {
        this.total = this.total * 1 + this.lifeTax * 1;
      }
      console.log(this.total)
      this.total = (Math.floor(this.total));
      console.log(this.total)
    }
  }
  tempOnRoadPrice: number;
  onSelect(event: TypeaheadMatch): void {
    this.onRoadPrice = 0
    console.log(this.selectedOption);
    this.selectedOption = event.item;
    this.selectedVehicleNo = this.selectedOption.vehicle_id;
    this.SelectedAssignNo = this.selectedOption.inventory_assign_id;
    this.vehicleFrameNo = this.selectedOption["Frame No"];
    this.vehicleDcNo = this.selectedOption["TVS-M Invoice No"];
    this.vehicleKeyNo = this.selectedOption.vechile_gatepass;
    this.vehicleColor = this.selectedOption.color_name;
    this.vehicleModel = this.selectedOption.model_name;
    console.log(this.selectedOption)
    console.log(this.forCsd)
    if (this.selectedOption.vehicle_variant) {
      this.saleUserService.getPriceListType(this.selectedOption.vehicle_variant, this.forCsd).subscribe(res => {
        console.log(res.json());
        this.vehicleVariant = res.json().result[0].variant_name;
        this.tempAcce = { standacc: res.json().result[0]["STD ACC"], optionalAtandacc: res.json().result[0]["OptionalACC"], hp: res.json().result[0][" HP Charges"] };
        this.vehicleBasic = res.json().result[0]["EX.PRICE"];
        this.lifeTax = res.json().result[0]["LTAX & TR"];
        this.VehicleInsu = res.json().result[0]["INS - 1 Yr Comprehensive and 5 Yr Third Party"];
        this.HandlingC = res.json().result[0]["FACILIATION CHARGES"];
        this.Registration = res.json().result[0]["Permantent Registation Cost"];
        this.StandardAcc = res.json().result[0]["STD ACC"];
        this.nilDip = res.json().result[0]["Optional NIL DIP"]
        if (this.vehicleBasic) {
          this.onRoadPrice = this.onRoadPrice + this.vehicleBasic;
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.lifeTax * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.VehicleInsu * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.Registration * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.HandlingC * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.StandardAcc * 1
        }
        // if (this.onRoadPrice) {
        //   this.onRoadPrice = this.onRoadPrice * 1 + this.VehicleHp * 1
        // }
        if (this.bookingAdvanceAmount) {
          this.onRoadPrice = this.onRoadPrice * 1 - this.bookingAdvanceAmount * 1
        }
        this.tempOnRoadPrice = this.onRoadPrice;
      });
    }
  }

  approvedEmpEnable() {
    if (this.discount >= 1) {
      console.log('***********')
      this.disableApprovedBy = 'visible'
    } else {
      this.disableApprovedBy = 'hidden'
    }
  }

  getFileDetails(event, text1) {
    this.currentImage = text1;
    var files = event.target.files;
    var file = files[0];

    for (var i = 0; i < files.length; i++) {
      this.uploadedFiles = files.name;
    }

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    if (event.target.files && event.target.files[0] && this.currentImage === 'a') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.addressFileName = file.name;
      reader.onload = (event) => {
        this.addressPreview = event.target;
      }
    }
    //for image preview
    if (event.target.files && event.target.files[0] && this.currentImage === 'i') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.idProofName = file.name;
      reader.onload = (event) => {
        this.idpreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'c') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.paymentEmi.chequeFileName = file.name;
      reader.onload = (event) => {
        this.chequepreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'p') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.userImageName = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'b') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.pdfName = file.name;
      reader.onload = (event) => {
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'pay') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.payOrderName = file.name;
      reader.onload = (event) => {
        this.payOrderPerview = event.target;
      }
    }
    if (event.target.files && event.target.files[0] && this.currentImage === 'delivery') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.deliveryFileName = file.name;
      reader.onload = (event) => {
        this.deliveryFormPreview = event.target;
      }
    }
  }

  //image base64 format
  _handleReaderLoaded(readerEvt) {
    if (this.currentImage === 'a') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.addressProof = btoa(binaryString);
    }

    if (this.currentImage === 'i') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.idProof = btoa(binaryString);
    }
    if (this.currentImage === 'c') {
      var binaryString = readerEvt.target.result;
      this.paymentEmi.cheque = btoa(binaryString);
    }

    if (this.currentImage === 'p') {
      var binaryString = readerEvt.target.result;
      this.userImage = btoa(binaryString);
    }
    if (this.currentImage === 'b') {
      var binaryString = readerEvt.target.result;
      this.bankStatemet = btoa(binaryString);
      this.data.push(this.bankStatemet);
      this.paymentEmi.bank_statement = this.data;
    }
    if (this.currentImage === 'pay') {
      var binaryString = readerEvt.target.result;
      this.payOrder = btoa(binaryString);
    }
    if (this.currentImage === 'delivery') {
      var binaryString = readerEvt.target.result;
      this.deliveryFromShowroom = btoa(binaryString);
    }
    this.currentImage = ''
  }

  isNumber(value: string | number): boolean {
    if (value) {
      return !isNaN(Number(value.toString()));
    } else {
      return false;
    }
  }
  withAcc: number;
  addTotalTax() {
    console.log('@@@@')
    let sum = 0;
    let temp1 = 0;
    this.withAcc = 0;
    temp1 = this.tempOnRoadPrice;
    if (this.isNumber(this.vehicleAcc)) {
      console.log(this.vehicleAcc)
      sum = sum + this.vehicleAcc * 1;
    }
    if (this.isNumber(this.nilDipValue)) {
      sum = sum + this.nilDipValue * 1;
    }
    if (this.isNumber(this.VehicleHp)) {
      sum = sum + this.VehicleHp * 1
    }
    if (this.isNumber(this.total)) {
      temp1 = temp1 - this.lifeTax;
      sum = sum + this.total
    }
    if (this.isNumber(this.discount)) {
      sum = sum - this.discount
    }
    if (this.isNumber(this.exchangeAmount)) {
      sum = sum - this.exchangeAmount;
    }

    if (sum) {
      this.withAcc = temp1 * 1 + sum * 1;
      this.onRoadPrice = this.withAcc;
    } else {
      this.onRoadPrice = this.tempOnRoadPrice;
    }
  }
  addTotalAmount() {
    this.cashTotal = 0;
    if (this.paymentEmi.chequeAmount && this.paymentEmi.chequeSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.chequeAmount;
    }
    if (this.paymentEmi.cashAmount && this.paymentEmi.cashSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.cashAmount
    }
    if (this.paymentEmi.creditcardAmount && this.paymentEmi.creditcardSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.creditcardAmount
    }
    if (this.paymentEmi.accounttranferAmount && this.paymentEmi.accountTranferSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.accounttranferAmount;
    }
    if (this.paymentEmi.othersAmount && this.paymentEmi.othersSelect) {
      this.cashTotal = this.cashTotal + this.paymentEmi.othersAmount
    }

    if (this.nomineeName && this.nomineeDob) {
      console.log(this.otp);
      if (this.disableApprovedBy == 'visible') {
        if (this.otpNumber == this.otp) {
          this.finalSubmit = false;
        } else {
          this.finalSubmit = true;
        }
      }
    } else {
      this.finalSubmit = false;
    }
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

  //this method allow bothe numbers and alphabets
  allow_numbers_alphabets(event) {
    var a;
    a = event.charCode
    return ((a > 64 && a < 91) || (a > 96 && a < 123) || a == 8 || a == 0 || (a >= 48 && a <= 57));
  }

  leaveFields() {
    var data = {
      name: this.name,
      nameOnRc: this.nameOnRc,
      dob: this.dob,
      relationName: this.relationName,
      address: this.address,
      mandal: this.mandal,
      pincode: this.pincode,
      districtName: this.districtName,
      mobile: this.mobile,
      email: this.email,
      addressProof: this.addressProof,
      addressProofNo: this.addressProofNo,
    }
    sessionStorage.setItem('salesdata', JSON.stringify(data))
  }
  discountEnable: boolean = false;
  selectedManager() {
    if (this.discountApprovedBy) {
      this.discountEnable = true;
    }
    if (this.discountApprovedBy == '0') {
      this.discountEnable = false;
    }
  }

  otpDate: any;
  otpNumber: '';
  otpButton: boolean = true;
  otp: '';

  sendOtp() {
    this.otpDate = new Date()
    let newDate1 = moment(this.otpDate).format('YYYY-MM-DD').toString();
    this.otpDate = newDate1;
    var data = {
      // branch_id: this.discountApprovedBy.employee_branch_id,
      employee_id: this.discountApprovedBy.discountsendotp_id,
      sale_user_id: this.userId,
      mobile: this.discountApprovedBy.number,
      discount_amount: this.discount,
      otp_date: this.otpDate,
      status: 1
    }
    this.saleUserService.sendOtpToManager(data).subscribe(res => {
      this.otpNumber = res.json().result
    })
  }

  getCurrentBranchVechiles() {
    let loginData = JSON.parse(sessionStorage.getItem('userSession'));
    var URL = '';
    URL = URL + '&branchid=' + loginData._results.employee_branch_id;
    let _booking = JSON.parse(sessionStorage.getItem('bookingData'));
    if (_booking) {
      if (_booking.vehicle_color) {
        URL = URL + '&color=' + _booking.vehicle_color
      }
      if (_booking.vehicle_model) {
        URL = URL + '&model=' + _booking.vehicle_model
      }
      if (_booking.vehicle_variant) {
        URL = URL + '&variant=' + _booking.vehicle_variant;
      }
    }
    this.spinner.show();
    this.saleUserService.getInventoryList(URL).subscribe(res => {
      this.spinner.hide();
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      }
    });
  }
  selectedVechile(val) {
    this._selectVec = val;
  }
  selectedSubmite() {
    $('#showEngineNo').modal('hide');
    // this.engineSearch(this._selectVec.engineno)
    // this.vehicleEngineNo = this._selectVec.engineno;
    console.log(this._selectVec)
    console.log(this._selectVec.vechile_id)
    this.onRoadPrice = 0
    this.vehicleEngineNo = this._selectVec.engineno;
    this.selectedValue = this._selectVec.engineno;
    this.selectedVehicleNo = this._selectVec.vechile_id;
    this.SelectedAssignNo = this._selectVec.inventory_assign_id;
    this.vehicleFrameNo = this._selectVec.frameno;
    this.vehicleDcNo = this._selectVec["DC No"];
    this.vehicleKeyNo = this._selectVec["Gate Pass"];
    this.vehicleColor = this._selectVec.color_name;
    this.vehicleModel = this._selectVec.model_name;
    if (this._selectVec.variant) {
      this.saleUserService.getPriceListType(this._selectVec.variant, this.forCsd).subscribe(res => {
        console.log(res.json())
        this.tempAcce = { standacc: res.json().result[0]["STD ACC"], optionalAtandacc: res.json().result[0]["OptionalACC"], hp: res.json().result[0][" HP Charges"] };
        this.vehicleVariant = res.json().result[0].variant_name;
        this.vehicleBasic = res.json().result[0]["EX.PRICE"];
        this.lifeTax = res.json().result[0]["LTAX & TR"];
        this.VehicleInsu = res.json().result[0]["INS - 1 Yr Comprehensive and 5 Yr Third Party"];
        this.HandlingC = res.json().result[0]["FACILIATION CHARGES"];
        this.Registration = res.json().result[0]["Permantent Registation Cost"];
        this.StandardAcc = res.json().result[0]["STD ACC"];
        this.nilDip = res.json().result[0]["Optional NIL DIP"]
        if (this.vehicleBasic) {
          this.onRoadPrice = this.onRoadPrice + this.vehicleBasic;
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.lifeTax * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.VehicleInsu * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.Registration * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.HandlingC * 1
        }
        if (this.onRoadPrice) {
          this.onRoadPrice = this.onRoadPrice * 1 + this.StandardAcc * 1
        }
        if (this.bookingAdvanceAmount) {
          this.onRoadPrice = this.onRoadPrice * 1 - this.bookingAdvanceAmount * 1
        }
        this.tempOnRoadPrice = this.onRoadPrice;
      });
    }
  }
}
