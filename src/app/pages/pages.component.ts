import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
/**
 * Componente das páginas
 *
 * @export
 * @class PagesComponent
 */
@Component({
    selector: 'app-pages',
    template: `<app-main-layout><router-outlet></router-outlet></app-main-layout>`,
})
export class PagesComponent {
    /**
     * Constante com os itens do menu
     *
     * @memberof PagesComponent
     */
    menu = MENU_ITEMS;
}
