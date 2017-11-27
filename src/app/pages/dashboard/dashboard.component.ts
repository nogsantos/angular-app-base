import { Component, OnInit } from '@angular/core';

/**
 * Componente para o dashboard
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    /**
     * Creates an instance of DashboardComponent.
     * @memberof DashboardComponent
     */
    constructor() { }
    /**
     * INIT
     *
     * @memberof DashboardComponent
     */
    ngOnInit() {
    }
}
