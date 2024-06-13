import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IntituicaoService } from './../service/intituicao.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabGroup } from '@angular/material/tabs';
import { Instituicao } from '../models/instituicao';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})
export class InstituicaoComponent implements OnInit {

  formInstituicao!: FormGroup;
  instituicoes: Instituicao[] = [];
  colunas = ['id', 'nome', 'tipo', 'acoes'];
  elements = 0;
  page = 0;
  size = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  editar: Boolean = false;

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogData: any;

  constructor(
    private intituicaoService: IntituicaoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarInstituicoes(this.page, this.size);
    this.createForm(new Instituicao());
  }

  paginar($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.listarInstituicoes(this.page, this.size);
  }

  onSubmit() {
    const values = this.formInstituicao.value;
    const instituicao: Instituicao = new Instituicao();
    instituicao.tipo = values.tipo;
    instituicao.nome = values.nome;

    if (this.editar === true) {
      let id = values.id;
      this.intituicaoService.editar(id, instituicao).subscribe(
        resposta => this.afterSubmit(resposta)
      );
    } else {
      this.intituicaoService.salvar(instituicao).subscribe(
        resposta => this.afterSubmit(resposta)
      );
    }
  }

  afterSubmit(resposta: any) {
    console.log(resposta)
    this.listarInstituicoes(this.page, this.size);
    this.tabGroup.selectedIndex = 0;    
  }

  createForm(instituicao: Instituicao) {
    this.formInstituicao = new FormGroup({
      id: new FormControl(instituicao.idInstituicao),
      nome: new FormControl(instituicao.nome, [Validators.required, Validators.minLength(5)]),
      tipo: new FormControl(instituicao.tipo, [Validators.required])
    })
  }

  listarInstituicoes(page: number, size: number) {
    this.intituicaoService.list(page, size).subscribe(
      resposta => {
        this.instituicoes = resposta.content;
        this.elements = resposta.totalElements;
        this.page = resposta.pageNumber;
      }
    )
  }

  confirmarExclusao(instituicao: Instituicao): void {
    this.dialogData = instituicao;
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      data: { nome: instituicao.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirInstituicao(instituicao);
      }
    });
  }

  excluirInstituicao(instituicao: Instituicao): void {
    console.log('Excluir ' + instituicao.idInstituicao);
    this.intituicaoService.excluir(instituicao.idInstituicao)
      .subscribe(() =>
        this.listarInstituicoes(this.page, this.size)
      );
  }

  editarInstituicao(instituicao: Instituicao): void {
    this.formInstituicao.setValue({
      id: instituicao.idInstituicao,
      nome: instituicao.nome,
      tipo: instituicao.tipo
    });

    this.editar = true;
    this.tabGroup.selectedIndex = 1;
  }


  resetForm(): void {
    this.formInstituicao.reset({
      id: 0,
      nome: '',
      tipo: ''
    });
    this.editar = false;
  }

  onTabChange(event: any): void {
    if(event.index === 0 ){
      this.editar = false;
    }
    if (event.index === 1 && this.editar === false) {
      this.resetForm();
    }
  }

}


