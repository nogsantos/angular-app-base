import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
import { LogService } from './log.service';
import { environment } from '../../../environments/environment';
// import PouchdbFind from 'pouchdb-find';

/**
 * @description
 *  Tratamento dos storages
 *
 * @export
 * @class Storage
 */
@Injectable()
export class DatabaseService {
    db: PouchDB;
    /**
     *
     *
     * @memberof WebDataBase
     */
    constructor(
        private log: LogService
    ) {
        this.create();
    }

    create() {
        try {
            this.db = new PouchDB('web');
            if (!environment.production) {
                PouchDB.debug.disable();
            }
        } catch (error) {
            this.log.error(error);
        }
    }
    /**
     * Cria um novo documento
     *
     * @param {(Object | any)} document O campo _id identifica o nome do documento.
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    post(document: Object | any): Promise<any> {
        return this.db.post(document).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Atualiza um documento
     *
     * @param {(Object | any)} document
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    put(document: Object | any): Promise<any> {
        return this.db.put(document).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Deleta um documento
     *
     * @param {string} document nome do documento a ser deletado.
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    delete(document: string): Promise<any> {
        return this.db.get(document).then(response => {
            return this.db.remove(response._id, response._rev);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Recupera um documento
     *
     * @param {string} document nome do documento a ser recuperado.
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    get(document: string): Promise<any> {
        return this.db.get(document).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Recupera um documento Asyncrono
     *
     * @param {string} document nome do documento a ser recuperado.
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    async getAsync(document: string) {
        try {
            const doc = await this.db.get(document);
            return doc;
        } catch (error) {
            this.log.error(error);
            return null;
        }
    }
    /**
     * Remove o banco de dados
     *
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    destroy(): Promise<any> {
        return this.db.destroy(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Localizar um registro
     *
     * @param {(Object | any)} selector
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    find(selector: Object | any, index?: Array<string>): Promise<any> {
        if (index) {
            this.db.createIndex({
                index: {
                    fields: index
                }
            });
        }
        return this.db.find({
            selector: selector
        }).then(result => {
            return Promise.resolve(result);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Localiza e atualiza todos os registros
     *
     * @param {(Object | any)} selector
     * @returns {Promise<any>}
     *
     * @memberof WebDataBase
     */
    // findAndUpdateAll(selector: Object | any): Promise<any> {
    //     return this.db.allDocs({
    //         include_docs: true,
    //         attachments: true
    //     }).then(result => {
    //         console.log(result);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }
}
