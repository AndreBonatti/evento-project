import { Evento } from './evento';

export class PageEvento {
    content!: Evento[];
    totalElements!: number;
    pageSize!: number;
    pageNumber!: number;
}