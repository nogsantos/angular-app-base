import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import {
    HttpService,
    LogService,
    Storage,
    DatabaseService,
    AuthGuardService
} from '../../../../@core/services';
import env from '../../../../@core/services/env';
import { User } from '../user';
import constante from '../constants';
import KJUR from 'jsrsasign';
import * as swal from 'sweetalert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide: boolean; // Ocultar ou apresentar a senha para o usuário
    user: User = new User();
    loading: boolean;
    /**
     * Creates an instance of LoginComponent.
     * @memberof LoginComponent
     */
    constructor(
        private request: HttpService,
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService,
        private auth: AuthGuardService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }
    /**
     * Init
     *
     * @memberof LoginComponent
     */
    ngOnInit() {
        this.hide = true;
        this.loading = false;
        /*
         * Sempre que apresentar a tela de login,
         * os dados de storage são limpos.
         */
        this.storage.remove(env.app.conf.token_name);
    }
    /**
     * Do the login
     *
     * @memberof LoginComponent
     */
    autenticate(): void {
        this.loading = true;
        this.request.send(constante.recurso.login, null, { user: this.user }).then(response => {
            if (response) {
                const isValid = KJUR.jws.JWS.verify(response.authentication_token, response.key, ['HS256']);
                const user = KJUR.jws.JWS.parse(response.authentication_token);
                user.payloadObj._id = response.key;
                /**
                 * Registra o usuário no pouch
                 */
                this.db.get(response.key).then(result => {
                    /*
                     * Se já existir o usuário, atualiza
                     */
                    if (result) {
                        user.payloadObj._rev = result._rev;
                        this.db.put(user.payloadObj);
                    }
                }).catch(newuser => {
                    /*
                     * Não existe, cadastra
                     */
                    user.payloadObj._id = `${newuser.docId}`;
                    this.db.put(user.payloadObj);
                }).then(() => {
                    /*
                     * Então, redireciona
                     */
                    swal(this.redirectAlert()).then(() => {
                        this.storage.set(env.app.conf.token_name, response.key);
                        this.router.navigate(['dashboard']);
                    });
                });
            }
            this.loading = false;
        }).catch(error => {
            this.loading = false;
            const message = JSON.parse(error._body);
            this.snackBar.open(
                message.error,
                '', {
                    duration: env.app.messages.duration.error,
                    verticalPosition: 'top'
                });
        });
    }
    /**
     * Configurações para o alert de redirecionamento
     *
     * @private
     * @returns {(string | Partial<any>)}
     * @memberof LoginComponent
     */
    private redirectAlert(): string | Partial<any> {
        return {
            title: 'Redirecionando...',
            icon: 'success',
            timer: 2000,
            buttons: false
        };
    }
}
