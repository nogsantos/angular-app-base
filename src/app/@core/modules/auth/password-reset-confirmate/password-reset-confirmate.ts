import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import {
    HttpService,
    LogService,
    Storage,
    DatabaseService,
    AuthGuardService
} from '../../../../@core/services';
import env from '../../../../@core/services/env';
import constante from '../constants';
import { AuthServices } from '../auth-services';
import $ from 'jquery';
/**
 * Confirmação para a requisição de recadastro da senha
 *
 * @export
 * @class PasswordResetConfirmateComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'app-password-reset-confirmate',
    templateUrl: './password-reset-confirmate.html',
    styleUrls: ['./password-reset-confirmate.scss'],
    providers: [AuthServices]
})
export class PasswordResetConfirmateComponent implements OnInit, OnDestroy {
    /**
     * Ocultar ou apresentar a senha para o usuário
     *
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    hide_password: boolean;
    /**
     * Ocultar ou apresentar a confirmação da senha para o usuário
     *
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    hide_password_confirm: boolean;
    /**
     * loading para o formulário
     *
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    loading: boolean;
    /**
     * Form control
     *
     * @type {FormControl}
     * @memberof PasswordResetConfirmateComponent
     */
    formControl: FormControl;
    /**
     * Confirma a solicitação
     *
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    solicitated: boolean;
    /**
     * Confirmação da resposta
     *
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    response: boolean;
    /**
     * Objeto usuário
     *
     * @memberof PasswordResetConfirmateComponent
     */
    user = {
        reset_digest: null,
        password: null,
        password_confirmation: null
    };
    /**
     * Subscribe event. Evento para ler os parametros vindos na url
     *
     * @private
     * @type {*}
     * @memberof PasswordResetConfirmateComponent
     */
    private sub: any;
    /**
     * Confirma se as senhas informadas são iguais
     *
     * @private
     * @type {boolean}
     * @memberof PasswordResetConfirmateComponent
     */
    private password_confirmation: boolean;
    /**
     * Creates an instance of PasswordResetConfirmateComponent.
     * Inject:
     * @param {HttpService} request
     * @param {LogService} log
     * @param {Storage} storage
     * @param {DatabaseService} db
     * @param {AuthGuardService} auth
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {MatSnackBar} snackBar
     * @param {AuthServices} services
     * @memberof PasswordResetConfirmateComponent
     */
    constructor(
        private request: HttpService,
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService,
        private auth: AuthGuardService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private services: AuthServices
    ) { }
    /**
     * Init
     *
     * @memberof ResetPasswordComponent
     */
    ngOnInit() {
        this.password_confirmation = true;
        this.hide_password = true;
        this.hide_password_confirm = true;
        this.sub = this.activatedRoute.params.subscribe(params => {
            if (params.token) {
                this.user.reset_digest = params.token;
            }
        });
    }
    /**
     * Cancelar
     *
     * @memberof RequireNewPassword
     */
    cancel() {
        this.router.navigate(['/']);
    }
    /**
     * Destroy
     *
     * @memberof PasswordResetConfirmateComponent
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    /**
     * Envia a requisição
     *
     * @memberof PasswordResetConfirmateComponent
     */
    send() {
        this.user.password = $.trim(this.user.password);
        this.user.password_confirmation = $.trim(this.user.password_confirmation);
        if ((this.user.reset_digest !== '' && this.user.password !== '' && this.user.password_confirmation !== '')
            && this.services.checkPasswords(this.user.password, this.user.password_confirmation)) {
            this.loading = true;
            this.request.send(`/user/password-reset-confirm`, null, { user: this.user }).then(response => {
                this.loading = false;
                try {
                    if (response && response.data.success) {
                        this.snackBar.open(
                            response.data.message,
                            '', {
                                duration: env.app.messages.duration.success,
                                verticalPosition: 'top'
                            });
                        setTimeout(() => {
                            this.cancel();
                        }, 1000);
                    }
                    return;
                } catch (error) {
                    return;
                }
            }).catch(error => {
                const err = JSON.parse(error._body);
                try {
                    this.snackBar.open(
                        err.password[0].message,
                        '', {
                            duration: env.app.messages.duration.error,
                            verticalPosition: 'top'
                        });
                } catch (er) {
                    this.snackBar.open(
                        err.data.message,
                        '', {
                            duration: env.app.messages.duration.error,
                            verticalPosition: 'top'
                        });
                }
                this.loading = false;
            });
        } else {
            this.snackBar.open(
                '',
                '', {
                    duration: env.app.messages.duration.error,
                    verticalPosition: 'top'
                });
        }
    }
    /**
     * Verifica se as senhas são iguais
     *
     * @returns
     * @memberof PasswordResetConfirmateComponent
     */
    checkPasswords() {
        if (this.user &&
            this.user.password !== '' &&
            this.user.password_confirmation !== '' &&
            this.user.password !== null &&
            this.user.password_confirmation !== null) {
            this.password_confirmation = this.services.checkPasswords(this.user.password, this.user.password_confirmation);
        }
    }
}
