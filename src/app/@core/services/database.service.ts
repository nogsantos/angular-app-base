import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
import { LogService } from './log.service';
import { environment } from '../../../environments/environment';

/**
 *
 * Tratamento dos storages com o pouch
 *
 * @export
 * @class Storage
 */
@Injectable()
export class DatabaseService {
    /**
     * Atributo da classe
     *
     * @type {PouchDB}
     * @memberof DatabaseService
     */
    db: PouchDB;
    /**
     * Creates an instance of DatabaseService.
     * @param {LogService} log
     * @memberof DatabaseService
     */
    constructor(
        private log: LogService
    ) {
        this.create();
    }
    /**
     * Cria o storage
     *
     * @memberof DatabaseService
     */
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
     * Get all registers
     *
     * @returns {Promise<any>}
     * @memberof DatabaseService
     */
    async getAll(): Promise<any> {
        return await this.db.allDocs({
            include_docs: true,
            attachments: true
        }).then(result => {
            return Promise.resolve(result);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Save an attachment
     *
     * @param {string} doc_id
     * @param {string} attachment_id
     * @param {*} attachment
     * @returns {Promise<any>}
     * @memberof DatabaseService
     */
    attach(doc_id: string, attachment_id: string, attachment: any): Promise<any> {
        return this.db.putAttachment(doc_id, attachment_id, attachment, 'text/plain').then(result => {
            return Promise.resolve(result);
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
}
