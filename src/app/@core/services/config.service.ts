import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {

    public address: string;
    public fcms_topico: string;
    /**
     * Creates an instance of Config.
     * @memberof Config
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
