import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { HttpService } from '../../../@core/services';

@NgModule({
    imports: [
        ThemeModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...routedComponents
    ],
    providers: [
        HttpService
    ]
})
export class AuthModule { }
