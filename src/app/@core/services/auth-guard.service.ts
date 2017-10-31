import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
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
    private is_authenticated: boolean;
    private count = 0;
    /**
     * Creates an instance of AuthGuardService.
     * @param {AuthService} auth
     * @param {Router} router
     * @memberof AuthGuardService
     */
    constructor(
        private auth: AuthService,
        private storage: Storage,
        private router: Router,
        private db: DatabaseService
    ) { }
    /**
     * @todo
     *
     * @returns {boolean}
     * @memberof AuthGuardService
     */
    canActivate(): boolean {
        this.getAuthenticated();
        if (!this.is_authenticated) {
            this.router.navigate(['auth/login']);
            return false;
        } else {
            return true;
        }
    }

    getAuthenticated() {
        this.db.getAll().then(result => {
            if (result.rows.length > 0) {
                result.rows.forEach(row => {
                    ++this.count;
                    console.log(this.storage.get(btoa(row.doc.username)));
                    if (this.storage.get(btoa(row.doc.username))) {
                        this.is_authenticated = true;
                        console.log(btoa(row.doc.username));
                        console.log('count t', this.count);
                        return;
                    }
                });
                console.log('count f', this.count);
                this.is_authenticated = false;
                return;
            } else {
                this.is_authenticated = false;
                return Promise.resolve(false);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
        // this.auth.isAuthenticated().then(result => {
        //     if (result.rows.length > 0) {
        //         result.rows.forEach(row => {
        //             console.log(this.storage.get(btoa(row.doc.username)));
        //             if (this.storage.get(btoa(row.doc.username))) {
        //                 this.is_authenticated = true;
        //                 console.log(btoa(row.doc.username));
        //                 return;
        //             } else {
        //                 console.log(btoa(row.doc.username));
        //                 this.is_authenticated = false;
        //                 return;
        //             }
        //         });
        //     } else {
        //         this.is_authenticated = false;
        //         return Promise.resolve(false);
        //     }
        // }).catch(error => {
        //     this.is_authenticated = false;
        //     return Promise.resolve(false);
        // });
    }

}

