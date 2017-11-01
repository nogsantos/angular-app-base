import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';

import {
    ConfigService,
    AuthGuardService,
    Storage,
    LogService,
    DatabaseService
} from './@core/services';

const SERVICES = [
    Title,
    ConfigService,
    AuthGuardService,
    Storage,
    LogService,
    DatabaseService,
    { provide: APP_BASE_HREF, useValue: '/' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [...SERVICES],
    bootstrap: [AppComponent]
})
export class AppModule { }
