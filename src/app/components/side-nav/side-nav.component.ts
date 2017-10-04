import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    step = 0;
    /**
     * Creates an instance of SideNavComponent.
     * @memberof SideNavComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof SideNavComponent
     */
    ngOnInit() {
    }
    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}
