import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';

const Levels = [
    'TRACE',
    'DEBUG',
    'INFO',
    'LOG',
    'WARN',
    'ERROR',
    'OFF'
];
/**
 * Rotina de log para desenvolvimento do sistema.
 *
 * @todo Sincronizar logs com o serviço
 *
 * @export
 * @class LogService
 */
@Injectable()
export class LogService {
    /**
     * Level do log
     *
     * @private
     * @type {LoggerLevel}
     * @memberof LogService
     */
    private _clientLogLevel: LoggerLevel;
    /**
     * Confirma se é o internet explorer
     *
     * @private
     * @type {boolean}
     * @memberof LogService
     */
    private _isIE: boolean;
    /**
     * Creates an instance of LogService.
     * @param {any} platformId
     * @param {LoggerConfig} options
     * @memberof LogService
     */
    constructor( @Inject(PLATFORM_ID) private platformId, @Optional() private options: LoggerConfig) {
        if (!this.options) {
            this.options = {
                level: LoggerLevel.OFF,
                serverLogLevel: LoggerLevel.OFF
            };
        }
        this._clientLogLevel = this.options.level;
        this._isIE = isPlatformBrowser(platformId) &&
            !!(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.match(/Trident\//) || navigator.userAgent.match(/Edge\//));
    }
    /**
     * Trace log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    trace(message, ...additional: any[]) {
        this._log(LoggerLevel.TRACE, true, message, additional);
    }
    /**
     * Debug log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    debug(message, ...additional: any[]) {
        this._log(LoggerLevel.DEBUG, true, message, additional);
    }
    /**
     * Info log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    info(message, ...additional: any[]) {
        this._log(LoggerLevel.INFO, true, message, additional);
    }
    /**
     * Just log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    log(message, ...additional: any[]) {
        this._log(LoggerLevel.LOG, true, message, additional);
    }
    /**
     * Warning log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    warn(message, ...additional: any[]) {
        this._log(LoggerLevel.WARN, true, message, additional);
    }
    /**
     * Error log
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    error(message, ...additional: any[]) {
        this._log(LoggerLevel.ERROR, true, message, additional);
    }
    /**
     * Timer log
     *
     * @private
     * @returns
     * @memberof LogService
     */
    private _timestamp() {
        return new Date().toISOString();
    }
    /**
     * IE log
     *
     * @param level
     * @param message
     * @param additional
     */
    private _logIE(level: LoggerLevel, message: string, additional: any[]) {
        switch (level) {
            case LoggerLevel.WARN:
                console.warn(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
                break;
            case LoggerLevel.ERROR:
                console.error(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
                break;
            case LoggerLevel.INFO:
                console.info(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
                break;
            default:
                console.log(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
        }
    }
    /**
     * Make log
     *
     * @private
     * @param {LoggerLevel} level
     * @param {boolean} logOnServer
     * @param {any} message
     * @param {any[]} [additional=[]]
     * @returns
     * @memberof LogService
     */
    private _log(level: LoggerLevel, logOnServer: boolean, message, additional: any[] = []) {
        if (!message) {
            return;
        }

        if (environment.production) {
            return;
        }

        if (typeof message === 'object') {
            try {
                message = JSON.stringify(message, null, 2);
            } catch (e) {
                additional = [message, ...additional];
                message = 'circular object in message. ';
            }
        }

        /*
         * Coloring doesn't work in IE
         */
        if (this._isIE) {
            return this._logIE(level, message, additional);
        }

        let color1;
        switch (level) {
            case LoggerLevel.TRACE:
                color1 = 'blue';
                break;
            case LoggerLevel.DEBUG:
                color1 = 'teal';
                break;
            case LoggerLevel.INFO:
            case LoggerLevel.LOG:
                color1 = 'gray';
                break;
            case LoggerLevel.WARN:
                color1 = 'yellow';
                break;
            case LoggerLevel.ERROR:
                color1 = 'red';
                break;
            case LoggerLevel.OFF:
            default:
                return;
        }
        const defaultColor = !this.options.enableDarkTheme ? 'white' : 'black';
        console.log(`%c${this._timestamp()} [${Levels[level]}] %c${message}`, `color:${color1}`, `color:${defaultColor}`, ...additional);
    }
}

/**
 * Log leve
 *
 * @export
 * @class LoggerConfig
 */
export class LoggerConfig {
    /**
     * Nível do log
     *
     * @type {LoggerLevel}
     * @memberof LoggerConfig
     */
    level: LoggerLevel;
    /**
     * Sincronização do log com um serviço
     *
     * @type {LoggerLevel}
     * @memberof LoggerConfig
     */
    serverLogLevel: LoggerLevel;
    /**
     * Url do serviço
     *
     * @type {string}
     * @memberof LoggerConfig
     */
    serverLoggingUrl?: string;
    /**
     * Tema do log
     *
     * @type {boolean}
     * @memberof LoggerConfig
     */
    enableDarkTheme?: boolean;
}

/**
 * Enum Log level
 *
 * @export
 * @enum {number}
 */
export enum LoggerLevel {
    TRACE = 0, DEBUG, INFO, LOG, WARN, ERROR, OFF
}
