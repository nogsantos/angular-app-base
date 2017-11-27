import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmitterService } from './emmiter.service';
/**
 * Utilizando para enviar um broadcaster geral, sem um identificador
 *
 * @export
 * @class MessageService
 */
@Injectable()
export class MessageService {
    /**
     * Creates an instance of MessageService.
     * @param {EmitterService} broadcaster
     * @memberof MessageService
     */
    constructor(
        private broadcaster: EmitterService
    ) { }
    /**
     * Envia uma mensagem
     *
     * Ex.:
     * ```
     *  this.message.fire('string');
     * ```
     * @param {string} data
     * @memberof MessageService
     */
    fire(data: string): void {
        this.broadcaster.broadcast(MessageEvent, data);
    }
    /**
     * Recebe uma mensagem
     *
     * Ex.:
     * ```
     *  this.message.on().subscribe(an_string => {
     *       // do someting...
     *   });
     * ```
     * @returns {Observable<string>}
     * @memberof MessageService
     */
    on(): Observable<string> {
        return this.broadcaster.on<string>(MessageEvent);
    }
}
