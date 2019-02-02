import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check';
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
                component: SetupSidebarComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'add-price-list',
                component: AddPriceListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'branch',
                component: BranchDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'veh-side-bar',
                component: VehsetupSideComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle-type',
                component: VehicleTypeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle-variant',
                component: VehicleVariantComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle-model',
                component: VehicleModelComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle-color',
                component: VehicleColorComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle-make',
                component: VehicleMadeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'send-otp-no',
                component: DiscountOtpNoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'finance-name',
                component: FinanceNamesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'price-list',
                component: SetupPriceListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'wallet',
                component: WalletComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class setupRoutingModule { }