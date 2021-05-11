import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifs, Pagination, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'//hace que sea global y no necesito declaralo en el module
})
export class GifsService {

  private servicioUrl :string ='https://api.giphy.com/v1/gifs';
  private apiKey: string = 'BVdmHrMh9D03fFy0eSwLVT37O2fVPH7I';
  private _historial: string[] = [];

  /* TODO: cambiar any por su tipo correspondiente */
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) { 

    if(localStorage.getItem('historial'))
    {
      this._historial=JSON.parse(localStorage.getItem('historial')!) || [];//aca hago lo inverso tranformo de un objeto o arreglo a un string
      this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];//recargo las ultimas imagenes en el navegador
    }
  }//con este http ya puedo hacer peticiones http post put delete en base a observables q tienen mayor control q la promesa
  buscarGifs(query: string = '') {//con el ='' lo obligo a que siempre tenga un valor
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query))//le digo si no incluye ya en el arreglo lo que le estoy pasando
    {
      this._historial.unshift(query);//agrego a lo ultimo del arreglo
      this._historial = this._historial.splice(0, 10)//le digo que solo muestre 10
      localStorage.setItem('historial',JSON.stringify(this._historial));//stringify puede tomar cualquier objeto y convertirlo a string
    }
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=BVdmHrMh9D03fFy0eSwLVT37O2fVPH7I&q=dragon ball z&limit=10')
    .then(resp =>{
      resp.json().then(data=>console.log(data));
    }) Asi lo haria con JS */
    const params=new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    this.http.get<SearchGifs>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });//estas peticiones retornan observables y me permite hacer mucho mas cosas q  fech
  }
}

