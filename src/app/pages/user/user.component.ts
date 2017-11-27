import { Component, OnInit } from '@angular/core';
/**
 * Componente usuário
 *
 * @export
 * @class UserComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-user',
    template: '<router-outlet></router-outlet>'
})
export class UserComponent implements OnInit {
    /**
     * Creates an instance of UserProfileComponent.
     * @memberof UserProfileComponent
     */
    constructor() { }
    /**
     * Init
     *
     * @memberof UserProfileComponent
     */
    ngOnInit() { }

}
