import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule, routedComponents } from './user-routing.module';


@NgModule({
    imports: [
        ThemeModule,
        UserRoutingModule
    ],
    declarations: [
        ...routedComponents
    ]
})
export class UserModule { }
