import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    DatabaseService,
    Storage,
    LogService
} from '../../../@core/services';
import env from '../../../@core/services/env';
import { element } from 'protractor';
/**
 * User profile
 *
 * @todo file upload form-data
 *
 * @export
 * @class UserProfileComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    form: FormGroup;
    loading: boolean;
    @ViewChild('fileInput') fileInput: ElementRef;
    user = {
        name: null,
        username: null,
        email: null
    };
    /**
     * Creates an instance of UserProfileComponent.
     * @memberof UserProfileComponent
     */
    constructor(
        private db: DatabaseService,
        private log: LogService,
        private fb: FormBuilder,
        private storage: Storage
    ) { }
    /**
     *
     *
     * @memberof UserProfileComponent
     */
    ngOnInit() {
        this.loading = false;
        this.createForm();
        this.getUserData();
    }
    /**
     *
     *
     * @memberof UserProfileComponent
     */
    getUserData() {
        if (this.storage.session(env.app.conf.token_name)) {
            this.db.get(this.storage.session(env.app.conf.token_name)).then(response => {
                if (response) {
                    this.user = Object.assign(response);
                }
            }).catch(error => {
                this.log.error(error);
            });
        }
    }
    /**
     *
     * @memberof UserProfileComponent
     */
    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            avatar: null
        });
    }
    /**
     *
     *
     * @param {any} event
     * @memberof UserProfileComponent
     */
    onFileChange(event) {
        // console.log(event);
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('avatar').setValue(file);
            // console.log(this.form);
        }
    }
    /**
     *
     *
     * @private
     * @returns {*}
     * @memberof UserProfileComponent
     */
    private prepareSave(): any {
        let input = new FormData();
        input.set('name', this.form.get('name').value);
        input.set('avatar', this.form.get('avatar').value);
        console.log(input);
        return input;
    }
    /**
     *
     *
     * @memberof UserProfileComponent
     */
    onSubmit() {
        this.loading = true;
        // const formModel = this.prepareSave();
        const formModel = new FormData();
        formModel.append('teste', 'teste');
        formModel.append('name', this.form.get('name').value);
        formModel.append('avatar', this.form.get('avatar').value);
        console.log(formModel.get('avatar'));
        // In a real-world app you'd have a http request / service call here like
        // this.http.post('apiUrl', formModel)
        // console.log(formModel);
        // setTimeout(() => {
        //     // FormData cannot be inspected (see "Key difference"), hence no need to log it here
        //     // alert('done!');
        //     this.loading = false;
        // }, 1000);
    }

    clearFile() {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

}
