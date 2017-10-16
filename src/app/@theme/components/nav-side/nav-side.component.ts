import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nav-side',
    templateUrl: './nav-side.component.html',
    styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
    step = 0;
    @Input() show: boolean;
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
        this.show = true;
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
}
