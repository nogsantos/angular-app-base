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
import $ from 'jquery';

@Component({
    selector: 'app-password-reset-confirmate',
    templateUrl: './password-reset-confirmate.html',
    styleUrls: ['./password-reset-confirmate.scss']
})
export class PasswordResetConfirmateComponent implements OnInit, OnDestroy {
    hide_password: boolean; // Ocultar ou apresentar a senha para o usuário
    hide_password_confirm: boolean; // Ocultar ou apresentar a senha para o usuário
    loading: boolean;
    formControl: FormControl;
    solicitated: boolean;
    response: boolean;
    user = {
        reset_digest: null,
        password: null,
        password_confirmation: null
    };
    private sub: any;
    private password_confirmation: boolean;
    /**
     * Creates an instance of ResetPasswordComponent.
     * @memberof ResetPasswordComponent
     */
    constructor(
        private request: HttpService,
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService,
        private auth: AuthGuardService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }
    /**
     *
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
     *
     *
     * @memberof PasswordResetConfirmateComponent
     */
    send() {
        this.user.password = $.trim(this.user.password);
        this.user.password_confirmation = $.trim(this.user.password_confirmation);
        if ((this.user.reset_digest !== '' && this.user.password !== '' && this.user.password_confirmation !== '')
            && this.passwordsAreEquals()) {
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
        this.user.password = $.trim(this.user.password);
        this.user.password_confirmation = $.trim(this.user.password_confirmation);
        if (this.user && this.user.password !== '' && this.user.password_confirmation !== '') {
            this.password_confirmation = this.passwordsAreEquals();
        }
    }
    /**
     *
     *
     * @returns
     * @memberof ConfirmPasswordReset
     */
    passwordsAreEquals() {
        return (this.user.password === this.user.password_confirmation);
    }
}