import { Component, OnInit } from '@angular/core';
/**
 * Componente erros 404(Não encontrado)
 *
 * @export
 * @class NotFoundComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
    /**
     * Título do componente
     *
     * @type {string}
     * @memberof NotFoundComponent
     */
    title: string;
    /**
     * Subtitulo do component
     *
     * @type {string}
     * @memberof NotFoundComponent
     */
    subtitle: string;
    /**
     * Creates an instance of NotFoundComponent.
     * @memberof NotFoundComponent
     */
    constructor() { }
    /**
     * Init
     *
     * @memberof NotFoundComponent
     */
    ngOnInit() {
        this.title = `404`;
        this.subtitle = `Conteúdo não localizado`;
    }

}
