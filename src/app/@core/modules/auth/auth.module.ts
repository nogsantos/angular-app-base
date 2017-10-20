import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { HttpService } from '../../../@core/services';

@NgModule({
    imports: [
        ThemeModule,
        AuthRoutingModule
    ],
    declarations: [
        ...routedComponents
    ],
    providers: [
        HttpService
    ]
})
export class AuthModule { }
