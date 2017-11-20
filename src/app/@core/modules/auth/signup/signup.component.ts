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
import constante from '../constants';
import $ from 'jquery';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    hide_password: boolean; // Ocultar ou apresentar a senha para o usuário
    hide_password_confirm: boolean; // Ocultar ou apresentar a senha para o usuário
    use_term_accepted: boolean;
    loading: boolean;
    formControl: FormControl;
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
        private snackBar: MatSnackBar
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
        this.formControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
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
        console.log(this.use_term_accepted);
    }
}
