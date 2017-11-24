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
import * as swal from 'sweetalert';
/**
 *
 *
 *
 * @export
 * @class SignupComponent
 * @implements {OnInit}
 */
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
    email_resent: any;
    user: FormGroup;
    user_id: number;
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
        this.user_id = null;
        this.email_resent = false;
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
        this.loading = true;
        const user = Object.assign(this.user['_value']);
        if (this.user.valid) {
            this.request.send(constante.recurso.users, null, { user: user }).then(response => {
                this.loading = false;
                try {
                    if (typeof response.data.id !== 'undefined') {
                        this.user_id = response.data.id;
                        swal(this.successAlert());
                        return;
                    }
                } catch (error) {
                    swal(this.errorAlert(error));
                    return;
                }
            }).catch(error => {
                this.setErrors(error);
                this.log.error(error);
                this.loading = false;
            });
        }
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
            password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
        return g.get('password').value === g.get('password_confirmation').value ? null : { 'mismatch': true };
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
            error = 'Email no formato inválido. Ex.: mail@mail.com';
        }
        if (field.hasError('minlength')) {
            error = 'Tamanho mínimo de 6 digitos';
        }
        return error;
    }
    /**
     * Configurações para o alerta de sucesso
     *
     * @private
     * @returns {(string | Partial<any>)}
     * @memberof SignupComponent
     */
    private successAlert(): string | Partial<any> {
        return {
            title: 'Cadastro realizado com sucesso',
            icon: 'success',
            timer: 3000,
            buttons: false
        };
    }
    /**
     * Configurações para o alerta de erro
     *
     * @private
     * @returns {(string | Partial<any>)}
     * @memberof SignupComponent
     */
    private errorAlert(msg: string): string | Partial<any> {
        return {
            text: msg,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: {
                cancel: 'CANCELAR',
                confirm: {
                    visible: false
                }
            }
        };
    }
    /**
     * Retorna as mensagens do serviço
     *
     * @private
     * @param {any} error
     * @memberof SignupComponent
     */
    private setErrors(error) {
        const jerror = JSON.parse(error._body);
        let serror = '';
        let busca = '';
        if (jerror.email) {
            busca = 'email';
        }
        if (jerror.username) {
            busca = 'username';
        }
        if (busca !== '') {
            jerror.username.forEach(element => {
                serror += `Campo ${element.attribute} ${element.message}`;
            });
        } else {
            serror = 'Erro desconhecido';
        }
        swal(this.errorAlert(serror));
    }
    /**
     * Prepara o formulário para um novo cadastro
     *
     * @memberof SignupComponent
     */
    novoCadastro() {
        this.user_id = null;
        this.validates();
    }
    /**
     * Reenvia um email para confirmação
     *
     * @memberof SignupComponent
     */
    resendEmail() {
        if (this.user_id) {
            this.loading = true;
            this.request.get(`${constante.recurso.user}/${this.user_id}/resend-account-confirmation`).then(response => {
                this.email_resent = response;
                this.loading = false;
                setTimeout(() => {
                    this.email_resent = false;
                }, 5000);
            }).catch(error => {
                this.loading = false;
                this.log.error(error);
            });
        }
    }
}
