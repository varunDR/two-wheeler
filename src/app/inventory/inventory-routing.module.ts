import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { RejectedListComponent } from './rejected-list/rejected-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'side-bar'
      },
      {
        path: 'side-bar',
        component: InvSidebarComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicle-details/bulk-import',
        component: AddVehicleBulkComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'indent-list',
        component: IndentListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'indent-raising',
        component: IndentRaisingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-acknowledge',
        component: InventoryAcknowledgeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-assigning',
        component: InventoryAssigningComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-list',
        component: InventoryListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-reversal',
        component: InventoryReversalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-reversal-list',
        component: InventoryReversalListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicle-details',
        component: VehicleDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory-rejected-list',
        component: RejectedListComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class inventoryRoutingModule { }
