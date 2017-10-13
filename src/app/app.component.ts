import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
    /**
     * Creates an instance of AppComponent.
     * @memberof AppComponent
     */
    constructor( ) { }
    /**
     * Init
     *
     * @memberof AppComponent
     */
    ngOnInit() {

    }
}
