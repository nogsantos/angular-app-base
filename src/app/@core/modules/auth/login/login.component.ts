import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        private db: DatabaseService,
        private router: Router
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
            if (response) {
                const isValid = KJUR.jws.JWS.verify(response.authentication_token, response.key, ['HS256']);
                const user = KJUR.jws.JWS.parse(response.authentication_token);
                user.payloadObj._id = response.key;
                this.db.get(response.key).then(result => {
                    if (result) {
                        user.payloadObj._rev = result._rev;
                        this.db.put(user.payloadObj);
                    }
                }).catch(newuser => {
                    user.payloadObj._id = `${newuser.docId}`;
                    this.db.put(user.payloadObj);
                });
                this.storage.set(btoa(user.payloadObj.username), response.key);
                this.router.navigate(['dashboard']);
            }
        }).catch(error => {
            this.log.error(error);
        });
    }
}
