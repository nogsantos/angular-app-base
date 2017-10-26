import { Injectable } from '@angular/core';
/**
 * @description
 *  Tratamento dos storages
 *
 * @export
 * @class Storage
 */
@Injectable()
export class Storage {
    /**
     * @see _getStorage()
     */
    constructor() {
        this.getStorage();
    }
    /**
     * Verifica se há o storage local e session pela chave
     *
     * @param {string} key Chave
     * @returns {boolean}
     *
     * @memberOf Storage
     */
    get(key: string): boolean {
        return (localStorage.getItem(key) !== null && sessionStorage.getItem(key) !== null) &&
            (localStorage.getItem(key) === sessionStorage.getItem(key));
    }
    /**
     * Seta os dados no storage local e session
     *
     * @param {string} key Chave
     * @param {string} value Valor
     *
     * @memberOf Storage
     */
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
    }
    /**
     * Remove os storages local e session
     *
     * @param {string} key Chave
     *
     * @memberOf Storage
     */
    remove(key: string): void {
        localStorage.clear();
        sessionStorage.removeItem(key);
        sessionStorage.removeItem('username');
    }
    /**
     * Verifica se há suporte para storage no navegador
     *
     * @private
     *
     * @memberOf Storage
     */
    private getStorage(): void {
        if ('localStorage' in window && window.localStorage === null) {
            throw new Error('Local Storage is disabled or unavailable.');
        } else if ('sessionStorage' in window && window.sessionStorage === null) {
            throw new Error('Session Storage is disabled or unavailable.');
        }
    }
}
