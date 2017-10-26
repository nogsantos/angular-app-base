import { Component, OnInit } from '@angular/core';

import { HttpService, LogService, Storage, DatabaseService } from '../../../../@core/services';
import env from '../../../../@core/services/env';
import { User } from '../user';
import constante from '../constants';
import KJUR from 'jsrsasign';

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
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService
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
            // this.log.debug(response.key);
            if (response) {
                const isValid = KJUR.jws.JWS.verify(response.authentication_token, response.key, ['HS256']);
                const user = KJUR.jws.JWS.parse(response.authentication_token);
                this.db.post(user.payloadObj);
                this.db.get('1').then(ret => {
                    console.log(ret);
                });
                console.log(user.payloadObj);
                this.storage.set(response.key, response.authentication_token);
            }
        }).catch(error => {
            this.log.error(error);
        });
    }
}
