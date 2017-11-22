import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import regex from '../../../../@core/services/regex';
import { AuthServices } from '../../../../@core/modules/auth/auth-services';
import constante from '../constants';
import $ from 'jquery';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [AuthServices]
})
export class SignupComponent implements OnInit {
    hide_password: boolean; // Ocultar ou apresentar a senha para o usuário
    hide_password_confirm: boolean; // Ocultar ou apresentar a senha para o usuário
    loading: boolean;
    password_confirmate: boolean;
    user: FormGroup;
    /**
     * Creates an instance of SignupComponent.
     * @param {HttpService} request
     * @param {LogService} log
     * @param {Storage} storage
     * @param {DatabaseService} db
     * @param {AuthGuardService} auth
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {MatSnackBar} snackBar
     * @memberof SignupComponent
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
     *
     *
     * @memberof SignupComponent
     */
    ngOnInit() {
        this.hide_password = true;
        this.hide_password_confirm = true;
        this.services.onPageScroll('form', 'm', 'fixit', 136);
        this.validates();
    }
    /**
     *
     *
     * @memberof SignupComponent
     */
    cancel() {
        this.router.navigate(['/']);
    }
    /**
     *
     *
     * @memberof SignupComponent
     */
    send() {
        const user = Object.assign(this.user['_value']);
    }
    /**
     *
     *
     * @memberof SignupComponent
     */
    validates() {
        this.user = new FormGroup({
            name: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern(regex.email)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password_confirmate: new FormControl('', [Validators.required, Validators.minLength(6)]),
            term_accepted: new FormControl(false, [Validators.requiredTrue])
        }, this.passwordMatchValidator);
    }
    /**
     * Valida se as senhas informadas são iguais
     *
     * @param {FormGroup} g
     * @returns
     * @memberof SignupComponent
     */
    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('password_confirmate').value ? null : { 'mismatch': true };
    }
    /**
     * Retorna a mensagem de erro de acordo com o erro relatado
     *
     * @returns
     * @memberof SignupComponent
     */
    getErrorMessage(field: any): string {
        let error = 'Campo obrigatório';
        if (field.hasError('pattern')) {
            error = 'Formato inválido';
        }
        if (field.hasError('minlength')) {
            error = 'Tamanho mínimo de 6 digitos';
        }
        return error;
    }
}
