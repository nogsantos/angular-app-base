import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ConfigService } from './config.service';

@Injectable()
export class HttpService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    /**
     * Creates an instance of HttpService.
     * @param {Http} http
     * @memberof HttpService
     */
    constructor(
        private http: Http,
        private config: ConfigService
    ) { }
    /**
     * Get
     *
     * @param {string} resorce
     * @param {string} [search_by] {term}
     * @returns {Promise<any[]>}
     * @memberof HttpService
     */
    get(resorce: string, search_by?: { term?: string }): Promise<any[]> {
        let parameter = '';
        if (search_by) {
            if (search_by.term) {
                parameter = `/?search=${search_by.term}`;
            }
        }
        return this.http.get(
            `${resorce}${parameter}`,
            {
                headers: this.headers
            }
        ).toPromise().then(response => response.json()).catch(this.handleError);
    }
    /**
     *
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
     * Error
     *
     * @private
     * @param {*} error
     * @returns {Promise<any>}
     * @memberof HttpService
     */
    private handleError(error: any): Promise<any> {
        alert(`An error occurred\n ${error}`);
        return Promise.reject(error.message || error);
    }

}
