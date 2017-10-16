import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    styleUrls: ['./main.layout.scss'],
    templateUrl: `./main.layout.html`,
})
export class MainLayoutComponent implements OnInit {
    side_show: boolean;
    percent = {
        sidenav: 20,
        content: 80
    };
    /**
     * Creates an instance of MainLayoutComponent.
     * @memberof MainLayoutComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof MainLayoutComponent
     */
    ngOnInit() {
        this.side_show = true;
    }
    /**
     *
     *
     * @memberof MainLayoutComponent
     */
    toggleSideNav(value) {
        this.percent.sidenav = this.percent.sidenav === 20 ? 0 : 20;
        this.percent.content = this.percent.content === 80 ? 100 : 80;
        this.side_show = !this.side_show;
    }
}
