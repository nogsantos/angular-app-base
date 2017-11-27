import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{
    path: '',
    component: ErrorsComponent,
    children: [{
        path: 'not-found',
        component: NotFoundComponent,
    }],
}];
/**
 * Rotas erros
 *
 * @export
 * @class ErrorsRoutingModule
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule { }

export const routedComponents = [
    ErrorsComponent,
    NotFoundComponent,
];
