import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';

/**
 *
 *
 * @export
 * @class LoggerConfig
 */
export class LoggerConfig {
    level: LoggerLevel;
    serverLogLevel: LoggerLevel;
    serverLoggingUrl?: string;
    enableDarkTheme?: boolean;
}
/**
 *
 *
 * @export
 * @enum {number}
 */
export enum LoggerLevel {
    TRACE = 0, DEBUG, INFO, LOG, WARN, ERROR, OFF
}

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
    private _clientLogLevel: LoggerLevel;
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
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    trace(message, ...additional: any[]) {
        this._log(LoggerLevel.TRACE, true, message, additional);
    }
    /**
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    debug(message, ...additional: any[]) {
        this._log(LoggerLevel.DEBUG, true, message, additional);
    }
    /**
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    info(message, ...additional: any[]) {
        this._log(LoggerLevel.INFO, true, message, additional);
    }
    /**
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    log(message, ...additional: any[]) {
        this._log(LoggerLevel.LOG, true, message, additional);
    }
    /**
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    warn(message, ...additional: any[]) {
        this._log(LoggerLevel.WARN, true, message, additional);
    }
    /**
     *
     *
     * @param {any} message
     * @param {...any[]} additional
     * @memberof LogService
     */
    error(message, ...additional: any[]) {
        this._log(LoggerLevel.ERROR, true, message, additional);
    }
    /**
     *
     *
     * @private
     * @returns
     * @memberof LogService
     */
    private _timestamp() {
        return new Date().toISOString();
    }
    /**
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
     *
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
