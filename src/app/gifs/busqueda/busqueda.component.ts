
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//me trae el elemento input completo el ! indica que eso no va a ser null

constructor(private gifsService:GifsService){

}

buscar(){

  const valor=this.txtBuscar.nativeElement.value;
  
  if(valor.trim().length===0)
  {
    return;
  }
  this.gifsService.buscarGifs(valor);

  this.txtBuscar.nativeElement.value='';
}

}
