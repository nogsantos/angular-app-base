import { Pipe, PipeTransform } from '@angular/core';
/**
 * Plural pipe
 *
 * @export
 * @class PluralPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'ngPlural' })
export class PluralPipe implements PipeTransform {
    /**
     * Coloca uma string em plural
     *
     * @param {number} input
     * @param {string} label
     * @param {string} [pluralLabel='']
     * @returns {string}
     * @memberof PluralPipe
     */
    transform(input: number, label: string, pluralLabel: string = ''): string {
        input = input || 0;
        return input === 1
            ? `${input} ${label}`
            : pluralLabel
                ? `${input} ${pluralLabel}`
                : `${input} ${label}s`;
    }
}
