import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IndexComponent } from '../../components/index/index.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
/**
 * Rotas
 */
const appRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            title: 'Index'
        }
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: {
            title: '404 - Not found'
        }
    },
];
/**
 * Definição das rotas default do App.
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }
