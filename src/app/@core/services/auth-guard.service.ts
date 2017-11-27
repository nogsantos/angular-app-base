import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Storage } from './storage.service';
import env from '../../@core/services/env';
/**
 * Rotinas Authguard
 *
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuardService implements CanActivate {
    /**
     * Creates an instance of AuthGuardService.
     * @param {Router} router
     * @memberof AuthGuardService
     */
    constructor(
        private storage: Storage,
        private router: Router
    ) { }
    /**
     * Define se o usuário pode acessar o recurso
     *
     * @returns {boolean}
     * @memberof AuthGuardService
     */
    canActivate(): boolean {
        if (!this.storage.check(env.app.conf.token_name)) {
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}

