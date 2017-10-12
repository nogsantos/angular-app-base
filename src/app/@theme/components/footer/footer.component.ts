import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    current_year: number;
    /**
     * Creates an instance of FooterComponent.
     * @memberof FooterComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof FooterComponent
     */
    ngOnInit() {
        this.current_year = new Date().getFullYear();
    }

}
