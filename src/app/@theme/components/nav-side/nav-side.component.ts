import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService, Storage, Md5Service } from '../../../@core/services';
import env from '../../../@core/services/env';
/**
 * Navegação lateral
 *
 * @export
 * @class NavSideComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-nav-side',
    templateUrl: './nav-side.component.html',
    styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
    /**
     * Visualizar ou ocultar o menu
     *
     * @type {boolean}
     * @memberof NavSideComponent
     */
    @Input() show: boolean;
    /**
     * Avatar do usuário.
     *
     * @private
     * @type {string}
     * @memberof NavSideComponent
     */
    private gravatar: string;
    /**
     * Objeto usuário
     *
     * @memberof NavSideComponent
     */
    user = {
        name: null,
        username: null,
        email: null
    };
    /**
     * Step
     *
     * @memberof NavSideComponent
     */
    step = 0;
    /**
     * Creates an instance of NavSideComponent.
     * Inject:
     * @param {DatabaseService} db
     * @param {Storage} storage
     * @param {Md5Service} md5
     * @memberof NavSideComponent
     */
    constructor(
        private db: DatabaseService,
        private storage: Storage,
        private md5: Md5Service
    ) { }
    /**
     * Init
     *
     * @memberof NavSideComponent
     */
    ngOnInit() {
        this.show = true;
        this.getUserData();
    }
    /**
     * Define o passo
     *
     * @param {number} index
     * @memberof NavSideComponent
     */
    setStep(index: number) {
        this.step = index;
    }
    /**
     * Próximo passo
     *
     * @memberof NavSideComponent
     */
    nextStep() {
        this.step++;
    }
    /**
     * Passo anterior
     *
     * @memberof NavSideComponent
     */
    prevStep() {
        this.step--;
    }
    /**
     * Consulta os dados do usuário armazenados no pouch
     *
     * @memberof NavSideComponent
     */
    getUserData() {
        if (this.storage.session(env.app.conf.token_name)) {
            this.db.get(this.storage.session(env.app.conf.token_name)).then(response => {
                if (response) {
                    this.user.name = response.name;
                    this.user.email = response.email;
                    this.user.username = response.username;
                    this.getAvatar(response.email);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    /**
     * Consulta o avatar do usuário.
     *
     *
     * @memberof Header
     */
    getAvatar(email) {
        if (email) {
            this.gravatar = `https://en.gravatar.com/avatar/${this.md5.encode(email)}?d=https://app.miamono.com/img/ic_miamono.png`;
        }
    }
}
