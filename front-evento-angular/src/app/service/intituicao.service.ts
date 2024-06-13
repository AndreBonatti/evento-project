import { PageInstituicao } from './../models/pageInstituicao';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Instituicao } from '../models/instituicao';


@Injectable({
  providedIn: 'root'
})
export class IntituicaoService {

  url: string = environment.apiBaseUrl + 'instituicao';

  constructor(
    private http: HttpClient
  ) { }

  salvar(instituicao: Instituicao): Observable<Instituicao> {
    return this.http.post<Instituicao>(this.url, instituicao);
  }

  list(page: number, size: number): Observable<PageInstituicao> {
    const params = new HttpParams()
    .set('offset', page)
    .set('limit', size);

    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  excluir(id: number): Observable<any>{
    console.log(`${this.url}/${id}`);
    return this.http.delete<any>(`${this.url}/${id}`);   
  }  

  editar(id: number, instituicao: Instituicao): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, instituicao);   
  }
  
}
