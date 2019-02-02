import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check';
import { ManSidebarComponent } from './man-sidebar/man-sidebar.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

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
                component: ManSidebarComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'add-employee',
                component: AddEmployeeComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class managerRoutingModule { }