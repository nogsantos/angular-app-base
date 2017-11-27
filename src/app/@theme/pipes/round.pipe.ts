import { Pipe, PipeTransform } from '@angular/core';
/**
 * Round pipe
 *
 * @export
 * @class RoundPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'ngRound' })
export class RoundPipe implements PipeTransform {
    /**
     * Arredonda um número
     *
     * @param {number} input
     * @returns {number}
     * @memberof RoundPipe
     */
    transform(input: number): number {
        return Math.round(input);
    }
}
