import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { NotFoundComponent } from './not-found/not-found.component';

import { ErrorsRoutingModule, routedComponents } from './errors-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        ErrorsRoutingModule
    ],
    declarations: [
        ...routedComponents
    ]
})
export class ErrorsModule { }