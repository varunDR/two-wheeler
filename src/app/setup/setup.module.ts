import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../common-session/session.check';
import { setupRoutingModule } from './setup-routing.module';
import { SetupSidebarComponent } from './setup-sidebar/setup-sidebar.component';
import { AddPriceListComponent } from './add-price-list/add-price-list.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { VehsetupSideComponent } from './setup-vehicle/vehsetup-side/vehsetup-side.component';
import { VehicleVariantComponent } from './setup-vehicle/vehicle-variant/vehicle-variant.component';
import { VehicleTypeComponent } from './setup-vehicle/vehicle-type/vehicle-type.component';
import { VehicleModelComponent } from './setup-vehicle/vehicle-model/vehicle-model.component';
import { VehicleMadeComponent } from './setup-vehicle/vehicle-made/vehicle-made.component';
import { VehicleColorComponent } from './setup-vehicle/vehicle-color/vehicle-color.component';
import { DiscountOtpNoComponent } from './discount-otp-no/discount-otp-no.component';
import { FinanceNamesComponent } from './finance-names/finance-names.component';
import { SetupPriceListComponent } from './setup-price-list/setup-price-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        setupRoutingModule,
        CalendarModule,
        TableModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        SetupSidebarComponent,
        AddPriceListComponent,
        BranchDetailsComponent,
        DiscountOtpNoComponent,
        FinanceNamesComponent,
        SetupPriceListComponent,
        WalletComponent,
        VehsetupSideComponent,
        VehicleVariantComponent,
        VehicleTypeComponent,
        VehicleModelComponent,
        VehicleMadeComponent,
        VehicleColorComponent
    ],
    providers: [AuthGuard]

})

export class setupModule { }