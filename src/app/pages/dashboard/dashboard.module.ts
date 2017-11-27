import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
/**
 * Módulo para o dashboard
 *
 * @export
 * @class DashboardModule
 */
@NgModule({
    imports: [
        ThemeModule
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule { }
