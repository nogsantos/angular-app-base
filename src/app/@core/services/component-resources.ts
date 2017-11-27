/**
 * Iterface para os recursos do sistema
 *
 * @export
 * @interface ComponentResource
 */
export interface ComponentResources {
    /**
     * Apresenta um dialog
     *
     * @param {string} param
     * @param {*} component
     * @memberof ComponentResources
     */
    showDialog(param: string, component: any): void;
    /**
     * Ordena as colunas de uma grid
     *
     * @param {any} sort
     * @param {*} data_source
     * @param {Array<string>} filds
     * @returns {Array<any>}
     * @memberof ComponentResources
     */
    sortData(sort, data_source: any, filds: Array<string>): Array<any>;
    /**
     * Compara um valor ao outro, com uma ordenação definida
     *
     * @param {any} a
     * @param {any} b
     * @param {any} isAsc
     * @returns {number}
     * @memberof ComponentResources
     */
    compare(a, b, isAsc): number;
}
