import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { saleRoutingModule } from './sale-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthGuard } from '../../common-session/session.check';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { DcFormComponent } from './dc-form/dc-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClipboardModule } from 'ngx-clipboard';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { ListBookingFormComponent } from './list-booking-form/list-booking-form.component';

@NgModule({
  imports: [
    CommonModule,
    saleRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),
    CalendarModule,
    TableModule,
    NgxSpinnerModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    NewSaleComponent,
    ViewSalesComponent,
    InvoiceListComponent,
    DcFormComponent,
    BookingFormComponent,
    GlobalSearchComponent,
    ListBookingFormComponent
  ],
  providers: [AuthGuard]
})

export class saleModule { }