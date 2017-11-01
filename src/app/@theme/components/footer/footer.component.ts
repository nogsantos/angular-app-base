import { Component, OnInit } from '@angular/core';

import { DatabaseService, Storage, LogService } from '../../../@core/services';
import env from '../../../@core/services/env';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    current_year: number;
    user = {
        name: null,
        email: null
    };
    /**
     * Creates an instance of FooterComponent.
     * @memberof FooterComponent
     */
    constructor(
        private db: DatabaseService,
        private log: LogService,
        private storage: Storage
    ) { }
    /**
     *
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
