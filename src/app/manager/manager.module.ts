import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { managerRoutingModule } from './manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../common-session/session.check';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ManSidebarComponent } from './man-sidebar/man-sidebar.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmpTypePipe } from '../pipe/emp-type.pipe';


@NgModule({
    imports: [
      CommonModule,
      managerRoutingModule,
      FormsModule,
      CalendarModule,
      ReactiveFormsModule,
      SimpleNotificationsModule.forRoot(),
      TableModule,
      NgxSpinnerModule
    ],
    declarations: [
    ManSidebarComponent,
    AddEmployeeComponent
    ],
    providers: [AuthGuard,EmpTypePipe]
})

export class managerModule { }
