import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-side',
    templateUrl: './nav-side.component.html',
    styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
    step = 0;
    /**
     * Creates an instance of NavSideComponent.
     * @memberof NavSideComponent
     */
    constructor() { }
    /**
     *
     *
     * @memberof NavSideComponent
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
