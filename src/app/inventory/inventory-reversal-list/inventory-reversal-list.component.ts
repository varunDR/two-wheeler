import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllVehicleService } from '../../services/all-vehicle.service';
import { NotificationsService } from 'angular2-notifications';
import { ReversalInventoryService } from '../../services/reversal-inventory.service'
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoryAssigningService } from '../../services/inventory-assigning.service'
import { CompleteVehicleService } from '../../services/complete-vehicle.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleDetailService } from '../../services/vehicle-detail.service';
declare var $: any;

@Component({
  selector: 'app-inventory-reversal-list',
  templateUrl: './inventory-reversal-list.component.html',
  styleUrls: ['./inventory-reversal-list.component.css'],
  providers: [DatePipe]
})
export class InventoryReversalListComponent implements OnInit {

  reversal: any[];
  inventoryData: any[];
  cols: any[];
  columns: any[];
  tempIndex: any

  typeData: any[];
  modelData: any[];
  colorData: any[];
  variantData: any[];

  vehicle: any = {
    'vehicleEngineNo': '',
    'vehicleFrameNo': '',
    'vehicleColor': '',
    'vehicleModel': '',
    'vehicleVariant': ''
  }

  return: any = {
    'returnInventoryId': '',
    'shippedBy': '',
    'shippedIn': '',
    'managerNote': '',
    'status': ''
  }

  inventory: any = {
    'inventoryAssignId': '',
    'vechileId': '',
    'branchId': ''
  }
  vehicleTypeFilter = "0";
  vehicleModelFilter = "0";
  vehicleColorFilter = "0";
  vehicleVariantFilter = "0";
  fromDate = "";
  toDate = "";
  InventoryReturnForm: FormGroup;
  submitted = false;
  temp: any = '';
  rejectList: any = {
    'return_inventory_id': '',
    'model_name': '',
    'variant_name': '',
    'color_name': '',
    'reject_comment': ''
  }

  public options = { position: ["top", "right"] }

  constructor(private router: Router, private allvehicleservice: AllVehicleService, private completevehicle: CompleteVehicleService, private notif: NotificationsService, private reversalservice: ReversalInventoryService, private Invassaignservice: InventoryAssigningService, private vehicleservice: VehicleDetailService, private dp: DatePipe, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var brurl = '';
    brurl = brurl + '?status=1';
    brurl = brurl + '&branchid=' + loginData._results.employee_branch_id;
    this.reversalservice.getReversalInventory(brurl).subscribe(reversalData => {
      if (reversalData.json().status == true) {
        this.reversal = reversalData.json().result
        console.log(this.reversal)
      } else {
        this.reversal = [];
      }
      this.spinner.hide();
    })

    let _color = this.completevehicle.getColor();
    if (Object.keys(_color).length) {
      this.colorData = _color
    } else {
      this.allvehicleservice.getColor().subscribe(data => {
        if (data.json().status == true) {
          this.colorData = data.json().result;
          this.completevehicle.addColor(data.json().result)
        } else {
          this.colorData = [];
        }
      });
    }

    let _category = this.completevehicle.getType();
    if (Object.keys(_category).length) {
      this.typeData = _category
    } else {
      this.allvehicleservice.getCategory().subscribe(data => {
        if (data.json().status == true) {
          this.typeData = data.json().result;
          this.completevehicle.addType(data.json().result)
        } else {
          this.typeData = [];
        }
      });
    }

    let _model = this.completevehicle.getModel();
    if (Object.keys(_model).length) {
      this.modelData = _model
    } else {
      this.allvehicleservice.getModel().subscribe(data => {
        if (data.json().status == true) {
          this.modelData = data.json().result;
          this.completevehicle.addModel(data.json().result)
        } else {
          this.modelData = [];
        }
      });
    }

    let _variant = this.completevehicle.getVariant();
    if (Object.keys(_variant).length) {
      this.variantData = _variant
    } else {
      this.allvehicleservice.getVariant().subscribe(data => {
        if (data.json().status == true) {
          this.variantData = data.json().result;
          this.completevehicle.addVariant(data.json().result)
        } else {
          this.variantData = [];
        }
      })
    }

    this.cols = [
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'type_name', header: 'Type' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
      { field: 'req_qty', header: 'Required Qty' },
      { field: 'req_on_date', header: 'Estimsted Date', type: this.dp },
    ];

    this.columns = [
      { field: 'engineno', header: 'Engine No.' },
      { field: 'frameno', header: 'Frame No.' },
      { field: 'model_name', header: 'Model' },
      { field: 'variant_name', header: 'Variant' },
      { field: 'color_name', header: 'Color' },
    ];

    this.InventoryReturnForm = this.formBuilder.group({
      shippedBy: ['', Validators.required],
      shippedIn: ['', Validators.required],
      managerNote: ['', Validators.required],
    });
  }

  get f() { return this.InventoryReturnForm.controls; }


  backToInventory() {
    this.router.navigate(['inventory']);
  }

  rejectVehicleClick(data, index) {
    this.temp = index;
    this.rejectList = data;
  }

  inventoryPop(data, index) {
    this.return.returnInventoryId = data.return_inventory_id
    this.return.status = data.status
    this.tempIndex = index
    this.spinner.show();
    let loginData = JSON.parse(sessionStorage.getItem('inventory'));
    var url = '';
    url = url + '&branchid=' + loginData._results.employee_branch_id;
    url = url + '&model=' + this.reversal[index].veh_model;
    console.log(url)
    this.Invassaignservice.getInventoryList(url).subscribe(res => {
      console.log(res.json())
      if (res.json().status == true) {
        this.inventoryData = res.json().result;
      } else {
        this.inventoryData = [];
      }
      this.spinner.hide();
    });
  }

  noAcknowledgement() {
    var data = {
      return_inventory_id: this.rejectList.return_inventory_id,
      status: "0",
      reject_comment: this.rejectList.reject_comment
    }
    console.log(data);
    this.reversalservice.addReversalInventory(data).subscribe(res => {
      if (res.json().status == true) {
        this.inventoryData.splice(this.temp, 1)
        $('#rejectVehicles').modal('hide');
        this.notif.success(
          'Success',
          'Rejected Successfully',
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    });
  }

  assaignButtonClick(data) {
    console.log(data)
    this.inventory.inventoryAssignId = data.inventory_assign_id
    this.inventory.vechileId = data.vechile_id
    this.inventory.branchId = data.branch_id
    this.vehicle.vehicleEngineNo = data.engineno
    this.vehicle.vehicleFrameNo = data.frameno
    this.vehicle.vehicleColor = data.color_name
    this.vehicle.vehicleModel = data.model_name
    this.vehicle.vehicleVariant = data.variant_name
  }

  updateReversalAssaigned() {
    var revdata = {
      return_inventory_id: this.return.returnInventoryId,
      shipped_by: this.return.shippedBy,
      shipped_vechile_no: this.return.shippedIn,
      br_mgr_comment: this.return.managerNote,
      status: "2"
    }
    console.log(this.tempIndex)
    console.log(revdata)
    this.reversalservice.addReversalInventory(revdata).subscribe(res => {
      if (res.json().status == true) {
        $('#toInventory').modal('hide');
        this.reversal.splice(this.tempIndex, 1)
      }
    });

    var invdata = {
      inventory_assign_id: this.inventory.inventoryAssignId,
      branch_id: null,
      status: "0"
    }
    console.log(invdata)
    this.Invassaignservice.addInventoryAssign(invdata).subscribe(res => {
      console.log(res)
    })

    var vehcledata = {
      vehicle_id: this.inventory.vechileId,
      status: "1"
    }
    this.vehicleservice.addVehicleDetails(vehcledata).subscribe(res => {
      if (res.json().status == true) {
        this.notif.success(
          'Success',
          'Vehicle Updated Successfully',
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
  clearEditedData() {
    this.return.shippedBy = ' ';
    this.return.shippedIn = ' ';
    this.return.managerNote = ' ';
  }
}
