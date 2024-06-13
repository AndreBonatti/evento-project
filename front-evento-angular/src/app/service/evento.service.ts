import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evento } from '../models/evento';
import { PageEvento } from '../models/pageEvento';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  url: string = environment.apiBaseUrl + 'evento';

  constructor(
    private http: HttpClient
  ) { }

  salvar(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.url, evento);
  }

  list(page: number, size: number): Observable<PageEvento> {
    const params = new HttpParams()
    .set('offset', page)
    .set('limit', size);

    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  excluir(id: number): Observable<any>{
    console.log(`${this.url}/${id}`);
    return this.http.delete<any>(`${this.url}/${id}`);   
  }  

  editar(id: number, evento: Evento): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, evento);   
  }
  
}
