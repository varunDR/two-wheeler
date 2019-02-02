import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check';
import {EmpTimeClocksComponent} from './emp-time-clocks/emp-time-clocks.component'

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Buttons'
      },
      children: [
        {
          path: '',
          redirectTo: 'emp'
        },
        {
          path: 'emp',
          component: EmpTimeClocksComponent,
          canActivate: [AuthGuard]
        },
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmpTimeClocksRoutingModule { }