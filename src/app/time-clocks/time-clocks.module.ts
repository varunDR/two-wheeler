import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../common-session/session.check';
import {EmpTimeClocksComponent} from './emp-time-clocks/emp-time-clocks.component';
import {EmpTimeClocksRoutingModule} from './time-clocks-routing.module'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EmpTimeClocksRoutingModule
    ],
    declarations: [
        EmpTimeClocksComponent
    ],
    providers: [AuthGuard]
})
export class EmpTimeClocksModule { }