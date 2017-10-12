import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    title: string;
    /**
     * Creates an instance of DashboardComponent.
     * @memberof DashboardComponent
     */
    constructor() {
        this.title = ``;
    }
    /**
     * INIT
     *
     * @memberof DashboardComponent
     */
    ngOnInit() {
    }
}
