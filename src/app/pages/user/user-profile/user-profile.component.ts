import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    title: string;
    /**
     * Creates an instance of UserProfileComponent.
     * @memberof UserProfileComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof UserProfileComponent
     */
    ngOnInit() {
        this.title = `Perfil do usuário`;
    }

}
