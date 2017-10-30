import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from '../../@core/services';

const routes: Routes = [{
    path: '',
    component: UserComponent,
    children: [{
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService],
        data: {
            title: 'Perfil do usuário'
        }
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserRoutingModule {

}

export const routedComponents = [
    UserComponent,
    UserProfileComponent,
];
