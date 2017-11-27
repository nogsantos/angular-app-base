import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    HttpService,
    LogService,
    Storage,
    DatabaseService
} from '../../../../@core/services';
import env from '../../../../@core/services/env';
import constante from '../constants';
import $ from 'jquery';
/**
 * Confirmação da conta do usuário.
 * Ao se cadastrar no sistema, o usuário recebe um email com um código que, ao acessá-lo,
 * caso ainda esteja ativo, o sistema o confirma como um usuário válido, possibilitando assim seu acesso ao sistema.
 *
 * @export
 * @class ConfirmateAccountComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'app-confirmate-account',
    templateUrl: './confirmate-account.html',
    styleUrls: ['./confirmate-account.scss']
})
export class ConfirmateAccountComponent implements OnInit, OnDestroy {
    /**
     * Subscribe, acessa os parametros definidos nas rotas do sistema
     *
     * @private
     * @type {*}
     * @memberof ConfirmateAccountComponent
     */
    private sub: any;
    /**
     * Objeto usuário
     *
     * @memberof ConfirmateAccountComponent
     */
    user = {
        name: null,
        email: null,
        confirmated_at: null
    };
    /**
     * Creates an instance of ConfirmateAccountComponent.
     * Inject:
     * @param {HttpService} request
     * @param {LogService} log
     * @param {Storage} storage
     * @param {DatabaseService} db
     * @param {AuthGuardService} auth
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @memberof ConfirmateAccountComponent
     */
    constructor(
        private request: HttpService,
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }
    /**
     * Init
     *
     * @memberof ConfirmateAccountComponent
     */
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            if (params.token) {
                this.confirm(params.token);
            }
        });
    }
    /**
     * Acessa o formulário de login
     *
     * @memberof ConfirmateAccountComponent
     */
    login() {
        this.router.navigate(['/']);
    }
    /**
     * Destroy
     *
     * @memberof ConfirmateAccountComponent
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    /**
     * Realiza a confirmação de acordo com o token informado
     *
     * @memberof ConfirmateAccountComponent
     */
    confirm(confirmation_token: string) {
        this.request.get(constante.recurso.confirmation, null, { token: `${confirmation_token}` }).then(response => {
            try {
                if (typeof response['data'].id !== 'undefined') {
                    this.user = Object.assign({}, response['data'].attributes);
                    return;
                }
            } catch (error) {
                this.user = null;
                return;
            }
        }).catch(error => {
            this.user = null;
            this.log.error(error);
        });
    }
}
