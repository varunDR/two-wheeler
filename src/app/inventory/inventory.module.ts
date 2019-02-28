import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { inventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../common-session/session.check';
import { InvSidebarComponent } from './inv-sidebar/inv-sidebar.component';
import { AddVehicleBulkComponent } from './add-vehicle-bulk/add-vehicle-bulk.component';
import { IndentListComponent } from './indent-list/indent-list.component';
import { IndentRaisingComponent } from './indent-raising/indent-raising.component';
import { InventoryAcknowledgeComponent } from './inventory-acknowledge/inventory-acknowledge.component';
import { InventoryAssigningComponent } from './inventory-assigning/inventory-assigning.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryReversalComponent } from './inventory-reversal/inventory-reversal.component';
import { InventoryReversalListComponent } from './inventory-reversal-list/inventory-reversal-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { InventoryListPipe } from '../pipe/inventory-list.pipe';
import { InventoryAddPipe } from '../pipe/inventory-add.pipe';
import { EmpTypePipe } from '../pipe/emp-type.pipe';
import { RejectedListComponent } from './rejected-list/rejected-list.component';

@NgModule({
  imports: [
    CommonModule,
    inventoryRoutingModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    TableModule,
    NgxSpinnerModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    InvSidebarComponent,
    AddVehicleBulkComponent,
    IndentListComponent,
    IndentRaisingComponent,
    InventoryAcknowledgeComponent,
    InventoryAssigningComponent,
    InventoryListComponent,
    InventoryReversalComponent,
    InventoryReversalListComponent,
    VehicleDetailsComponent,
    RejectedListComponent
  ],
  providers: [AuthGuard, InventoryListPipe, InventoryAddPipe, EmpTypePipe]
})

export class inventoryModule { }
