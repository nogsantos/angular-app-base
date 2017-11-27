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
 * Perfil do usuário
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
    /**
     * Formgroup components
     *
     * @type {FormGroup}
     * @memberof UserProfileComponent
     */
    form: FormGroup;
    /**
     * View loading
     *
     * @type {boolean}
     * @memberof UserProfileComponent
     */
    loading: boolean;
    /**
     * File input
     *
     * @type {ElementRef}
     * @memberof UserProfileComponent
     */
    @ViewChild('fileInput') fileInput: ElementRef;
    /**
     * Objeto usuário
     *
     * @memberof UserProfileComponent
     */
    user = {
        name: null,
        username: null,
        email: null
    };
    /**
     * Creates an instance of UserProfileComponent.
     * Inject:
     * @param {DatabaseService} db
     * @param {LogService} log
     * @param {FormBuilder} fb
     * @param {Storage} storage
     * @memberof UserProfileComponent
     */
    constructor(
        private db: DatabaseService,
        private log: LogService,
        private fb: FormBuilder,
        private storage: Storage
    ) { }
    /**
     * Init
     *
     * @memberof UserProfileComponent
     */
    ngOnInit() {
        this.loading = false;
        this.createForm();
        this.getUserData();
    }
    /**
     * Consulta os dados do usuário
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
     * Inicialização do formulário
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
     * Alteração do arquivo de upload
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
     * Preparação para o envio do arquivo
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
     * Envio dos dados
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
    /**
     * Limpa o formulário
     *
     * @memberof UserProfileComponent
     */
    clearFile() {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

}
