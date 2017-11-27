import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ConfigService } from './config.service';
import { LogService } from './log.service';

/**
 * Configurações e acesso aos recursos do serviço
 *
 * @export
 * @class HttpService
 */
@Injectable()
export class HttpService {
    /**
     * Header das requisições
     *
     * @private
     * @memberof HttpService
     */
    private headers = new Headers({ 'Content-Type': 'application/json' });
    /**
     * Creates an instance of HttpService.
     * Inject:
     * @param {Http} http
     * @param {LogService} log
     * @param {ConfigService} config
     * @memberof HttpService
     */
    constructor(
        private http: Http,
        private log: LogService,
        private config: ConfigService
    ) { }
    /**
     * Get a resource from server
     *
     * @param {string} resorce Recurso a ser solicitado
     * @param {Object} [search_by] Deve ser informado um termo para a pesquisa Ex.: ```{ term: 'some'}```
     * @param {Object} [obj] Enviar um objeto para a pesquisa Ex.: ``` { campo: valor } ```
     * @returns {Promise<any[]>}
     * @memberof HttpService
     */
    get(resorce: string, search_by?: { term?: string }, obj?: any): Promise<any[]> {
        let parameter = '';
        if (search_by) {
            if (search_by.term) {
                parameter = `/?search=${search_by.term}`;
            }
        }
        if (obj) {
            let first = true;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (first) {
                        parameter += `?${key}=${obj[key]}`;
                        first = false;
                    } else {
                        parameter += `&${key}=${obj[key]}`;
                    }
                }
            }
        }
        return this.http.get(
            `${this.config.address}${resorce}${parameter}`,
            {
                headers: this.headers
            }
        ).toPromise().then(response => response.json()).catch(this.handleError);
    }
    /**
     * Send values to server
     *
     * @param {string} resource
     * @param {number} [id]
     * @param {Object} [body]
     * @returns {Promise<any>}
     * @memberof HttpService
     */
    send(resource: string, id?: number, body?: Object): Promise<any> {
        let action;
        if (id) {
            action = this.http.put(`${this.config.address}${resource}/${id}`, JSON.stringify(body), { headers: this.headers });
        } else {
            action = this.http.post(`${this.config.address}${resource}`, JSON.stringify(body), { headers: this.headers });
        }
        return action.toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Handle erros from requests
     *
     * @private
     * @param {*} error
     * @returns {Promise<any>}
     * @memberof HttpService
     */
    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
