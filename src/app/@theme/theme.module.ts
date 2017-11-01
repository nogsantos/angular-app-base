/**
 * Angular Material
 * https://material.angular.io/
 *
 * Exporta os módulos para o angular material. As declarações devem ser feitas nesse módulo.
 *
 * @export
 * @class MaterialModule
 */
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
/*
 * Material
 */
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatExpansionModule
} from '@angular/material';
/*
 * Components
 */
import {
    FooterComponent,
    NavSideComponent,
    NavTopComponent
} from './components';
/*
 * Layout
 */
import {
    MainLayoutComponent
} from './layouts';
/*
 * Core services
 */
import {
    EmitterService,
    MessageService,
    LogService,
    DatabaseService,
    Storage,
    Md5Service
} from '../@core/services';
/*
 * Hammer
 */
import 'hammerjs';
/*
 * Pipes
 */
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';

const MATERIAL_MODULES = [
    CdkTableModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatExpansionModule
];

const COMPONENTS = [
    MainLayoutComponent,
    FooterComponent,
    NavSideComponent,
    NavTopComponent
];

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, HttpModule];

const PIPES = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
];

const CORE_SERVICES = [
    EmitterService,
    MessageService,
    LogService,
    DatabaseService,
    Storage,
    Md5Service
];

@NgModule({
    imports: [...BASE_MODULES, ...MATERIAL_MODULES],
    exports: [...BASE_MODULES, ...MATERIAL_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
    providers: [...CORE_SERVICES]
})
export class ThemeModule { }
