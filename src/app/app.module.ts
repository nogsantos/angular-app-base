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

import { ConfigService, AuthGuardService, AuthService, Storage } from './@core/services';

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
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        },
        Title,
        ConfigService,
        AuthGuardService,
        AuthService,
        Storage
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
