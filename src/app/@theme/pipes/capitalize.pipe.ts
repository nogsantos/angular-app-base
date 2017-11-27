import { Pipe, PipeTransform } from '@angular/core';
/**
 * Captalize pipe
 *
 * @export
 * @class CapitalizePipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'ngCapitalize' })
export class CapitalizePipe implements PipeTransform {
    /**
     * Transforma as letras iniciais em maiúsculas
     *
     * @param {string} input
     * @returns {string}
     * @memberof CapitalizePipe
     */
    transform(input: string): string {
        return input && input.length
            ? (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
            : input;
    }
}
