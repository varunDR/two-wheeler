import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';
import { TodaySaleReportComponent } from './today-sale-report/today-sale-report.component';
import { TotalSaleReportComponent } from './total-sale-report/total-sale-report.component';
import { VehiclesReportComponent } from './vehicles-report/vehicles-report.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';


const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Buttons'
      },
      children: [
        {
          path: '',
          redirectTo: 'report'
        },
        {
          path: 'report',
          component: ReportsDashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'today-sale',
          component: TodaySaleReportComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'total-sale',
          component: TotalSaleReportComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'vehicle-report',
          component: VehiclesReportComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'inventory-report',
          component: InventoryReportComponent,
          canActivate: [AuthGuard]
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class reportsRoutingModule { }