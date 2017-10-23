import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './@core/services/auth-guard.service';
/*
 * Rotas
 */
const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: 'app/@core/modules/auth/auth.module#AuthModule'
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard] },
    { path: 'error', loadChildren: 'app/pages/errors/errors.module#ErrorsModule' },
    { path: '**', loadChildren: 'app/pages/errors/errors.module#ErrorsModule' },
];
/*
 * Add hash
 */
const config: ExtraOptions = {
    useHash: true,
    enableTracing: false
};
/**
 * Definição das rotas default do App.
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
