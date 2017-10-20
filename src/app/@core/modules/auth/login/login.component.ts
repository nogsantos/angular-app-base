import { Component, OnInit } from '@angular/core';

import { HttpService, LogService } from '../../../../@core/services';
import { User } from '../user';
import constante from '../constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide: boolean;
    user: User = new User();
    /**
     * Creates an instance of LoginComponent.
     * @memberof LoginComponent
     */
    constructor(
        private request: HttpService,
        private log: LogService
    ) { }
    /**
     *
     *
     * @memberof LoginComponent
     */
    ngOnInit() {
        this.hide = true;
    }
    /**
     * Do login
     *
     * @memberof LoginComponent
     */
    autenticate(): void {
        this.request.send(constante.recurso.login, null, { user: this.user }).then(response => {
            this.log.debug(response);
        }).catch(error => {
            this.log.error(error);
        });
    }
}
