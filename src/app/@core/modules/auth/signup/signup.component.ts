import { Component, OnInit } from '@angular/core';
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
    use_term_accepted: boolean;
    loading: boolean;
    password_confirmate: boolean;
    // formControl: FormControl;
    user = {
        name: null,
        username: null,
        email: null,
        password: null,
        password_confirmate: null
    };
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
        this.use_term_accepted = false;
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
        console.log(this.user);
    }
    /**
     *
     *
     * @memberof SignupComponent
     */
    validates() {
        this.user.name = new FormControl('', [Validators.required]);
        this.user.username = new FormControl('', [Validators.required]);
        this.user.email = new FormControl('', [Validators.required, Validators.pattern(regex.email)]);
        this.user.password = new FormControl('', [Validators.required]);
        this.user.password_confirmate = new FormControl('', [Validators.required]);
    }
    /**
     *
     *
     * @returns
     * @memberof SignupComponent
     */
    getErrorMessage() {
        return this.user.email.hasError('required') ? 'You must enter a value' :
            this.user.email.hasError('email') ? 'Not a valid email' : '';
    }
    /**
     * Verifica se as senhas digitadas são iguais
     *
     * @memberof SignupComponent
     */
    checkPasswords() {
        if (this.user &&
            this.user.password !== '' &&
            this.user.password_confirmate !== '' &&
            this.user.password !== null &&
            this.user.password_confirmate !== null) {
            this.password_confirmate = this.services.checkPasswords(this.user.password, this.user.password_confirmate);
        }
    }
}
