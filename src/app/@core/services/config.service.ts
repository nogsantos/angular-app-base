import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

/**
 * Serviço de configuração do sistema
 *
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
    /**
     * Propriedade que define o endereço
     *
     * @type {string}
     * @memberof ConfigService
     */
    public address: string;
    /**
     * Quando houver, propriedade que define o tópico para um serviço de notificação.
     *
     * @type {string}
     * @memberof ConfigService
     */
    public fcms_topico: string;
    /**
     * Creates an instance of ConfigService.
     * @memberof ConfigService
     */
    constructor() {
        if (environment.production) {
            this.address = 'https://api.miamono.com/v1';
            this.fcms_topico = 'desenvolvimento';
        } else {
            this.address = 'http://127.0.0.1:3000/v1';
            this.fcms_topico = 'aplication';
        }
    }
}
