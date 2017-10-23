import { Injectable } from '@angular/core';

import { Storage } from './storage.service';
import env from './env';

@Injectable()
export class AuthService {
    /**
     * Creates an instance of AuthService.
     * @memberof AuthService
     */
    constructor(
        private storage: Storage
    ) { }
    /**
     * Check if is authenticated
     *
     * @returns {boolean}
     * @memberof AuthService
     */
    public isAuthenticated(): boolean {
        return this.storage.get(env.app.conf.token_name);
    }

}
