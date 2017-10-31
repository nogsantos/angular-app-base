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
            return Promise.resolve(result);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
