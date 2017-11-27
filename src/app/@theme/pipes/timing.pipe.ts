import { Pipe, PipeTransform } from '@angular/core';
/**
 * Timming pipe
 *
 * @export
 * @class TimingPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'timing' })
export class TimingPipe implements PipeTransform {
    /**
     * Transforma o número no padrão de tempo
     *
     * @param {number} time
     * @returns {string}
     * @memberof TimingPipe
     */
    transform(time: number): string {
        if (time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${this.initZero(minutes)}${minutes}:${this.initZero(seconds)}${seconds}`;
        }

        return '00:00';
    }
    /**
     * Inicia com zeros
     *
     * @private
     * @param {number} time
     * @returns {string}
     * @memberof TimingPipe
     */
    private initZero(time: number): string {
        return time < 10 ? '0' : '';
    }
}
