import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/**
 * Menu topo
 *
 * @export
 * @class NavTopComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
    /**
     * Saída. Oculta ou apresenta o menu de navegação lateral
     *
     * @memberof NavTopComponent
     */
    @Output() toggleNav = new EventEmitter();
    /**
     * Ícone para o menu de navegação lateral
     *
     * @type {string}
     * @memberof NavTopComponent
     */
    toggle_icon: string;
    /**
     * Para a navegação lateral
     *
     * @type {boolean}
     * @memberof NavTopComponent
     */
    toggle: boolean;
    /**
     * Creates an instance of NavTopComponent.
     * @memberof NavTopComponent
     */
    constructor() { }
    /**
     * Init
     *
     * @memberof NavTopComponent
     */
    ngOnInit() {
        this.toggle_icon = 'horizontal';
        this.toggle = true;
    }
    /**
     * Ação para ocultar/apresentar o menu de navegação lateral
     *
     * @memberof NavSideComponent
     */
    toggleNavAction() {
        this.toggle = !this.toggle;
        this.toggleNav.emit(this.toggle);
        this.toggle_icon = this.toggle ? 'horizontal' : 'vertical';
    }

}
