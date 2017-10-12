import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
