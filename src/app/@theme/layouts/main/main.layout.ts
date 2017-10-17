import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { EmitterService } from '../../../@core/services';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-main-layout',
    styleUrls: ['./main.layout.scss'],
    templateUrl: `./main.layout.html`,
})
export class MainLayoutComponent implements OnInit {
    side_show: boolean;
    title: string;
    percent = {
        sidenav: 20,
        content: 80
    };
    /**
     * Creates an instance of MainLayoutComponent.
     * @memberof MainLayoutComponent
     */
    constructor(
        private broadcast: EmitterService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }
    /**
     *
     *
     * @memberof MainLayoutComponent
     */
    ngOnInit() {
        this.side_show = true;
        this.registerBroadcast();
    }
    /**
     *
     *
     * @memberof MainLayoutComponent
     */
    toggleSideNav(value) {
        this.percent.sidenav = this.percent.sidenav === 20 ? 0 : 20;
        this.percent.content = this.percent.content === 80 ? 100 : 80;
        this.side_show = value;
    }
    /**
     *
     *
     * @memberof MainLayoutComponent
     */
    registerBroadcast() {
        this.title = 'Bem vindo!';
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => this.title = event['title']);
    }
}
