import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
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
        public router: Router
    ) { }
    /**
     *
     *
     * @returns {boolean}
     * @memberof AuthGuardService
     */
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
