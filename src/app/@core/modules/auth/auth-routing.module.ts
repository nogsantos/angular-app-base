import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountConfirmComponent } from './account-confirm/account-confirm.component';
import { PasswordResetConfirmateComponent } from './password-reset-confirmate/password-reset-confirmate';

const routes: Routes = [{
    path: '',
    component: AuthComponent,
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        {
            path: 'login',
            component: LoginComponent,
            data: {
                title: 'Log In'
            }
        },
        {
            path: 'signup',
            component: SignupComponent,
            data: {
                title: 'Sign Up'
            }
        },
        {
            path: 'reset',
            component: ResetPasswordComponent,
            data: {
                title: 'Password recovery'
            }
        },
        {
            path: 'account-confirmation',
            component: AccountConfirmComponent,
            data: {
                title: 'Account confirmation'
            }
        },
        {
            path: 'password-reset-confirmate/:token',
            component: PasswordResetConfirmateComponent,
            data: {
                title: 'Reset password'
            }
        },
        { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AuthRoutingModule {}
/*
 * Exporta os componentes para o módulo
 */
export const routedComponents = [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    AccountConfirmComponent,
    PasswordResetConfirmateComponent,
];
