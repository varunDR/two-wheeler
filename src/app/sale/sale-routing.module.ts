import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check'
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { DcFormComponent } from './dc-form/dc-form.component';
 
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'new-sale',
        component: NewSaleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'view-sale',
        component: ViewSalesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'invoice-list',
        component: InvoiceListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dc-form',
        component: DcFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class saleRoutingModule {}
