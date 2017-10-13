import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
/*
 * Rotas
 */
const appRoutes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', loadChildren: 'app/pages/errors/errors.module#ErrorsModule' },
];
/*
 * Add hash
 */
const config: ExtraOptions = {
    useHash: true,
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
