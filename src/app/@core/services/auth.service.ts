import { Injectable } from '@angular/core';

import { Storage } from './storage.service';
import { DatabaseService } from './database.service';
import { LogService } from './log.service';
import env from './env';

@Injectable()
export class AuthService {
    /**
     * Creates an instance of AuthService.
     * @memberof AuthService
     */
    constructor(
        private log: LogService,
        private storage: Storage,
        private db: DatabaseService
    ) { }
    /**
     * Check if is authenticated
     *
     * @returns {boolean}
     * @memberof AuthService
     */
    isAuthenticated(): Promise<any> {
        return this.db.getAll().then(result => {
            if (result.rows.length > 0) {
                return result.rows;
                // result.rows.forEach(user => {
                //     const username = user.doc.username;
                //     if (this.storage.get(btoa(username))) {
                //         console.log('true', '1');
                //         return Promise.resolve(true);
                //     } else {
                //         console.log('false', '1');
                //         return Promise.reject(false);
                //     }
                // });
            } else {
                return false;
            }
        }).catch(error => {
            return false;
        });
        // console.log('check', check);
        // return check;
    }
}
