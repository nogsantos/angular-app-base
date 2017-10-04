import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    current_year: string;
    public translatedText: string;
    public supportedLanguages: any[];
    /**
     * Creates an instance of AppComponent.
     * @memberof AppComponent
     */
    constructor(
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }
    /**
     * Init
     *
     * @memberof AppComponent
     */
    ngOnInit() {
        this.current_year = `${new Date().getFullYear()}`;
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
            .subscribe((event) => this.titleService.setTitle(`Client - ${event['title']}`));
    }
}
