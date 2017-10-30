import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { Storage } from './storage.service';
/**
 *
 *
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuardService implements CanActivate {
    /**
     * Creates an instance of AuthGuardService.
     * @param {AuthService} auth
     * @param {Router} router
     * @memberof AuthGuardService
     */
    constructor(
        public auth: AuthService,
        private storage: Storage,
        public router: Router
    ) { }
    /**
     * @todo
     *
     * @returns {boolean}
     * @memberof AuthGuardService
     */
    canActivate(): boolean {
        try {
            Promise.resolve(this.auth.isAuthenticated());
            return true;
        } catch (error) {
            Promise.reject(this.auth.isAuthenticated());
            return false;
        }
        // return this.checkAuth();
        // p = this.auth.isAuthenticated();
        // console.log();
        // if (!p) {
        //     console.log('false');
        //     this.router.navigate(['auth/login']);
        //     return false;
        // } else {
        //     console.log('true');
        //     return true;
        // }
        // return true;
    }

    private async checkAuth() {
        try {
            return await this.auth.isAuthenticated().then(resolve => {
                if (resolve) {
                    resolve.forEach(user => {
                        console.log(user.doc.username);
                        const username = user.doc.username;
                        if (this.storage.get(btoa(username))) {
                            // console.log('true', '1');
                            return Promise.resolve(true);
                        } else {
                            // console.log('false', '1');
                            return Promise.reject(false);
                        }
                    });
                    return Promise.resolve(true);
                }
            }).catch(reject => {
                // console.log(reject);
                return Promise.resolve(false);
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}
