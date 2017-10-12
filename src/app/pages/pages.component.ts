import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
    selector: 'app-pages',
    template: `
    <app-main-layout>
      <router-outlet></router-outlet>
    </app-main-layout>
  `,
})
export class PagesComponent {
    menu = MENU_ITEMS;
}
