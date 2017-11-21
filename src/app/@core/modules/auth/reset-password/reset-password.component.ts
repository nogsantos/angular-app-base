import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import {
    HttpService,
    LogService,
    Storage,
    DatabaseService,
    AuthGuardService
} from '../../../../@core/services';
import env from '../../../../@core/services/env';
import regex from '../../../../@core/services/regex';
import constante from '../constants';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    loading: boolean;
    formControl: FormControl;
    solicitated: boolean;
    response: boolean;
    user = {
        email: null,
    };
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
        private snackBar: MatSnackBar
    ) { }
    /**
     *
     *
     * @memberof ResetPasswordComponent
     */
    ngOnInit() {
        this.loading = false;
        this.formControl = new FormControl('', [Validators.required, Validators.pattern(regex.email)]);
    }
    /**
     *
     *
     * @memberof ResetPasswordComponent
     */
    send() {
        if (this.formControl.valid) {
            this.loading = true;
            this.request.send(`/user/password-reset`, null, { email: this.user.email }).then(response => {
                this.loading = false;
                this.solicitated = true;
                this.response = Boolean(response);
                this.timerMessage();
            }).catch(error => {
                this.loading = false;
                this.solicitated = true;
                this.response = false;
                this.user.email = null;
                this.log.error(error);
            });
        } else {
            this.snackBar.open(
                'Informe um email válido cadastrado em nosso sistema',
                '', {
                    duration: env.app.messages.duration.error,
                    verticalPosition: 'top'
                });
        }
    }
    /**
     * Timer para apresentação da mensagem na tela
     *
     * @memberof RequireNewPassword
     */
    timerMessage() {
        setTimeout(() => {
            this.resetForm();
        }, 10000);
    }
    /**
     *
     *
     * @memberof ResetPasswordComponent
     */
    resetForm() {
        this.solicitated = false;
        this.user.email = null;
    }
}
