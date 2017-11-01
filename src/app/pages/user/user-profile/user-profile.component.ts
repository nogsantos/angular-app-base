import { Component, OnInit } from '@angular/core';

import {
    DatabaseService,
    Storage,
    LogService
} from '../../../@core/services';
import env from '../../../@core/services/env';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user = {
        name: null,
        username: null,
        email: null
    };
    /**
     * Creates an instance of UserProfileComponent.
     * @memberof UserProfileComponent
     */
    constructor(
        private db: DatabaseService,
        private log: LogService,
        private storage: Storage
    ) { }
    /**
     *
     *
     * @memberof UserProfileComponent
     */
    ngOnInit() {
        if (this.storage.session(env.app.conf.token_name)) {
            this.db.get(this.storage.session(env.app.conf.token_name)).then(response => {
                if (response) {
                    this.user = Object.assign(response);
                }
            }).catch(error => {
                this.log.error(error);
            });
        }
    }

}
