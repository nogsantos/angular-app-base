import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../@core/services';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            title: 'Dashboard'
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }],
}];
/**
 * Rotas das páginas
 *
 * @export
 * @class PagesRoutingModule
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
