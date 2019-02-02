import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../common-session/session.check';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { reportsRoutingModule } from './reports-routing.module';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';
import { TodaySaleReportComponent } from './today-sale-report/today-sale-report.component';
import { TotalSaleReportComponent } from './total-sale-report/total-sale-report.component';
import { VehiclesReportComponent } from './vehicles-report/vehicles-report.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        reportsRoutingModule,
        NgxSpinnerModule,
        CalendarModule,
        TableModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        ReportsDashboardComponent,
        TodaySaleReportComponent,
        TotalSaleReportComponent,
        VehiclesReportComponent,
        InventoryReportComponent
    ],
    providers: [AuthGuard]
})
export class reportsModule { }

