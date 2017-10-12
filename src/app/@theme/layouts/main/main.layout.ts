import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'app-main-layout',
    styleUrls: ['./main.layout.scss'],
    templateUrl: `./main.layout.html`,
})
export class MainLayoutComponent implements OnDestroy {
    user: any;
    userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
    layout: any = {};
    sidebar: any = {};

    protected layoutState$: Subscription;

    constructor() { }

    ngOnDestroy() {
        this.layoutState$.unsubscribe();
    }
}
