import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
/*
 * Rotas
 */
const appRoutes: Routes = [
    { path: 'r', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'r', pathMatch: 'full' },
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
