import { Instituicao } from './../models/instituicao';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Evento } from '../models/evento';
import { EventoService } from '../service/evento.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTabGroup } from '@angular/material/tabs';
import { IntituicaoService } from '../service/intituicao.service';
import { map, startWith, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { dateRangeValidator } from '../validator/custom-data-validator';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  myControl = new FormControl();
  formEvento!: FormGroup;
  eventos: Evento[] = [];
  instituicoes: Instituicao[] = [];
  colunas = ['id', 'nome', 'dataInicial', 'dataFinal', 'ativo', 'acoes'];
  elements = 0;
  page = 0;
  size = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  editar: Boolean = false;

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogData: any;

  filteredOptions!: Observable<Instituicao[]>;

  constructor(
    private eventoService: EventoService,
    private intituicaoService: IntituicaoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarEventos(this.page, this.size);
    this.listarInstituicoes(0, 1000);
    this.createForm(new Evento());
  }


  createForm(evento: Evento) {
    this.formEvento = new FormGroup({
      id: new FormControl(evento.idEvento),
      nome: new FormControl(evento.nome, [Validators.required, Validators.minLength(5)]),
      dataInicial: new FormControl(evento.dataInicial, [Validators.required]),
      dataFinal: new FormControl(evento.dataFinal, [Validators.required]),
      instituicaoId: new FormControl(evento.instituicaoId, [Validators.required]),
    }, { validators: dateRangeValidator() });
  }

  paginar($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.listarEventos(this.page, this.size);
  }

  onSubmit() {
    const values = this.formEvento.value;
    const evento: Evento = new Evento();
    evento.nome = values.nome;
    evento.dataInicial = values.dataInicial;
    evento.dataFinal = values.dataFinal;
    evento.instituicaoId = values.instituicaoId;
    
    if (this.editar === true) {
      let id = values.id;
      this.eventoService.editar(id, evento).subscribe(
        resposta => this.afterSubmit(resposta)
      );
    } else {
      this.eventoService.salvar(evento).subscribe(
        resposta => this.afterSubmit(resposta)
      );
    }
  }

  afterSubmit(resposta: any) {
    console.log(resposta)
    this.listarEventos(this.page, this.size);
    this.listarInstituicoes(0, 1000);
    this.tabGroup.selectedIndex = 0;    
  }


  listarEventos(page: number, size: number) {
    this.eventoService.list(page, size).subscribe(
      resposta => {
        this.eventos = resposta.content;
        this.elements = resposta.totalElements;
        this.page = resposta.pageNumber;
      }
    )
  }

  async listarInstituicoes(page: number, size: number): Promise<void> {
    const resposta = await this.intituicaoService.list(page, size).pipe(first()).toPromise();
    this.instituicoes = resposta.content;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterInstituicao(value))
    );
  }

  
  confirmarExclusao(evento: Evento): void {
    this.dialogData = evento;
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      data: { nome: evento.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirEvento(evento);
      }
    });
  }

  excluirEvento(evento: Evento): void {
    console.log('Excluir ' + evento.idEvento);
    this.eventoService.excluir(evento.idEvento)
      .subscribe(() =>
        this.listarEventos(this.page, this.size)
      );
  }

  editarEvento(evento: any): void {
    this.formEvento.setValue({
      id: evento.idEvento,
      nome: evento.nome,
      dataInicial: new Date(evento.dataInicial),
      dataFinal: new Date(evento.dataFinal),
      instituicaoId: evento.instituicao.idInstituicao
    });

    this.myControl.setValue(evento.instituicao.nome);

    this.editar = true;
    this.tabGroup.selectedIndex = 1;
  }

  resetForm(): void {
    this.formEvento.reset({
      id: 0,
      nome: '',
      dataInicial: '',
      dataFinal: '',
      instuticaoId: 0
    });
    this.myControl.setValue('');
    this.editar = false;
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.editar = false;
    }
    if (event.index === 1 && this.editar === false) {
      this.resetForm();
    }
  }

  ajusteData(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }

  filterInstituicao(value: String): Instituicao[] {
    const filterValue = value.toLowerCase();
    return this.instituicoes.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: any) {
    const selectedNome = event.option.value;
    const selectedInstituicao = this.instituicoes.find(instituicao => instituicao.nome === selectedNome);
    if (selectedInstituicao) {
      this.formEvento.get('instituicaoId')?.setValue(selectedInstituicao.idInstituicao);
    }
  }
}
