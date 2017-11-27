import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
/**
 * Enviar uma mensagem com um identificador
 * Para utilizar:
 *```markdown
 *  Injetar o objeto no construtor
 *```
 *
 * @export
 * @class EmitterService
 */
@Injectable()
export class EmitterService {
    /**
     * Define a propriedade de evento
     *
     * @private
     * @type {Subject<BroadcastEvent>}
     * @memberof EmitterService
     */
    private _eventBus: Subject<BroadcastEvent>;
    /**
     * Creates an instance of Broadcaster.
     * @memberof Broadcaster
     */
    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }
    /**
     * Send a broadcast
     *
     * Ex.:
     * ```javascript
     *  this.emmiter.broadcast('key', 'any');
     * ```
     *
     * @param {*} key
     * @param {*} [data]
     * @memberof Broadcaster
     */
    broadcast(key: any, data?: any) {
        this._eventBus.next({ key, data });
    }
    /**
     * Receice and observe
     *
     * Ex.:
     * ```javascript
     * this.broadcast.on<string>('key').subscribe(any => {
     *  // do someting...
     * });
     * ```
     * @template T
     * @param {*} key
     * @returns {Observable<T>}
     * @memberof Broadcaster
     */
    on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable().filter(event => event.key === key).map(event => <T>event.data);
    }
}
/**
 * Interface para geração do broadcaster
 *
 * @interface BroadcastEvent
 */
interface BroadcastEvent {
    /**
     * Chave
     *
     * @type {*}
     * @memberof BroadcastEvent
     */
    key: any;
    /**
     * Valor
     *
     * @type {*}
     * @memberof BroadcastEvent
     */
    data?: any;
}
