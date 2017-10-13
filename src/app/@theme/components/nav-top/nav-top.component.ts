import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
    @Output() toggleNav = new EventEmitter();
    toggle_icon: string;
    toggle: boolean;
    /**
     * Creates an instance of NavTopComponent.
     * @memberof NavTopComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof NavTopComponent
     */
    ngOnInit() {
        this.toggle_icon = 'horizontal';
        this.toggle = true;
    }
    /**
     *
     *
     * @memberof NavSideComponent
     */
    toggleNavAction() {
        this.toggle = !this.toggle;
        this.toggleNav.emit(this.toggle);
        this.toggle_icon = this.toggle ? 'horizontal' : 'vertical';
    }

}
