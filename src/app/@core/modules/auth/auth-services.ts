import { Injectable } from '@angular/core';

import env from '../../../@core/services/env';
import $ from 'jquery';
/**
 *
 *
 * @export
 * @class AuthServices
 */
@Injectable()
export class AuthServices {

    constructor() { }
    /**
     * Verifica se as senhas são iguais
     *
     * @param {string} password
     * @param {string} confirm_password
     * @returns {boolean}
     * @memberof AuthServices
     */
    checkPasswords(password: string, confirm_password: string): boolean {
        return $.trim(password) === $.trim(confirm_password);
    }
    /**
     * @legends Adicina classe a um elemento quando hover scroll na página, à partir de uma referência.
     *
     * @example Para ativar o método, adicionar a chamada no ngOnInit()
     *
     * @param {string} target Alvo a ser adicionado a classe
     * @param {string} screen_width Valores s, m, l
     * @param {string} css_class Classe a ser adicionada ao elemento
     * @param {number} window_scroll_when Valor de referência para ser adicionado o scroll
     * @memberof AuthServices
     */
    onPageScroll(target: string, screen_width: string, css_class: string, window_scroll_when: number) {
        $(window).on('scroll', event => {
            if (window.innerWidth > this.defineWidth(screen_width)) {
                const windscroll = $(window).scrollTop();
                if (windscroll > window_scroll_when) {
                    $(target).addClass(css_class);
                } else {
                    $(target).removeClass(css_class);
                }
            } else {
                $(target).removeClass(css_class);
            }
        });
    }
    /**
     * Define o tamanho da tela via parâmetro
     *
     * @private
     * @param {string} w
     * @returns {number}
     * @memberof AuthServices
     */
    private defineWidth(w: string): number {
        let size: number;
        switch (w) {
            case 'L':
            case 'l':
                size = env.media_query_screen.large_up;
                break;
            case 'M':
            case 'm':
                size = env.media_query_screen.medium_up;
                break;
            case 'S':
            case 's':
                size = env.media_query_screen.small_up;
                break;
            default:
                size = env.media_query_screen.medium_up;
                break;
        }
        return size;
    }
}
