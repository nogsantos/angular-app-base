import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide: boolean;
    /**
     * Creates an instance of LoginComponent.
     * @memberof LoginComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof LoginComponent
     */
    ngOnInit() {
        this.hide = true;
    }
}
