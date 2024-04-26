import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-franja-renovacion',
  templateUrl: './franja-renovacion.component.html',
  styleUrls: ['./franja-renovacion.component.scss'],
})
export class FranjaRenovacionComponent implements OnInit {

    
  @Input() numeroProceso: number =1;

  listaNumerada = [
  {index: 0, nombre: "Detalle de crédito"},  
  {index: 1, nombre: "Selección de oferta"},
  {index: 2, nombre: "Formulario de datos"},
  {index: 3, nombre: "Documentos del cliente"},
  {index: 4, nombre: "Cuenta | Comprobante"},
  {index: 5, nombre: "Resumen renovación"}]
  constructor() { }

  ngOnInit() {}

}
