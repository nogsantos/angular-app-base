import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService, Storage, Md5Service } from '../../../@core/services';
import env from '../../../@core/services/env';
@Component({
    selector: 'app-nav-side',
    templateUrl: './nav-side.component.html',
    styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
    @Input() show: boolean;
    private gravatar: string;
    user = {
        name: null,
        username: null,
        email: null
    };
    step = 0;
    /**
     * Creates an instance of NavSideComponent.
     * @memberof NavSideComponent
     */
    constructor(
        private db: DatabaseService,
        private storage: Storage,
        private md5: Md5Service
    ) { }
    /**
     *
     *
     * @memberof NavSideComponent
     */
    ngOnInit() {
        this.show = true;
        this.getUserData();
    }
    /**
     *
     *
     * @param {number} index
     * @memberof NavSideComponent
     */
    setStep(index: number) {
        this.step = index;
    }
    /**
     *
     *
     * @memberof NavSideComponent
     */
    nextStep() {
        this.step++;
    }
    /**
     *
     *
     * @memberof NavSideComponent
     */
    prevStep() {
        this.step--;
    }
    /**
     * Consulta os dados do usuário armazenados no pouch
     *
     * @memberof NavSideComponent
     */
    getUserData() {
        if (this.storage.session(env.app.conf.token_name)) {
            this.db.get(this.storage.session(env.app.conf.token_name)).then(response => {
                if (response) {
                    this.user.name = response.name;
                    this.user.email = response.email;
                    this.user.username = response.username;
                    this.getAvatar(response.email);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    /**
     * Consulta o avatar do usuário.
     *
     *
     * @memberof Header
     */
    getAvatar(email) {
        if (email) {
            this.gravatar = `https://en.gravatar.com/avatar/${this.md5.encode(email)}?d=https://app.miamono.com/img/ic_miamono.png`;
        }
    }
}
