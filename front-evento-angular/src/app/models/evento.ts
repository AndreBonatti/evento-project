export class Evento {

    public idEvento: number = 0;
    public nome: string = '';
    public dataInicial: string = '';
    public dataFinal: string = '';
    public ativo: Boolean = false;
    public instituicaoId!: number;
    
    constructor(
    ) { }

}