import { Component, OnInit } from '@angular/core';

import { DatabaseService, Storage, LogService } from '../../../@core/services';
import env from '../../../@core/services/env';
/**
 * Stick footer
 *
 * @export
 * @class FooterComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    /**
     * Para a view, apresenta o ano corrente
     *
     * @type {number}
     * @memberof FooterComponent
     */
    current_year: number;
    /**
     * Objeto usuário
     *
     * @memberof FooterComponent
     */
    user = {
        name: null,
        email: null
    };
    /**
     * Creates an instance of FooterComponent.
     * Inject:
     * @param {DatabaseService} db
     * @param {LogService} log
     * @param {Storage} storage
     * @memberof FooterComponent
     */
    constructor(
        private db: DatabaseService,
        private log: LogService,
        private storage: Storage
    ) { }
    /**
     * Init
     *
     * @memberof FooterComponent
     */
    ngOnInit() {
        this.current_year = new Date().getFullYear();
        if (this.storage.session(env.app.conf.token_name)) {
            this.db.get(this.storage.session(env.app.conf.token_name)).then(response => {
                if (response) {
                    this.user.name = response.name;
                    this.user.email = response.email;
                }
            }).catch(error => {
                this.log.error(error);
            });
        }
    }
}
